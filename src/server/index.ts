import { extractRepository } from '@site/src/helpers/extract-repository';
import { processProject } from '@site/src/helpers/generate-stats';
import { getScore } from '@site/src/helpers/get-score';
import { cache } from './configs/cache.js';
import { ALLOWED_ORIGINS } from './configs/origins.js';
import { checkRateLimit, RATE_LIMIT } from './configs/rate-limit.js';
import { isValidParam, sanitizeParam } from './helpers/validations.js';

export default {
  async fetch(request: Request, env: Env) {
    if (request.method !== 'POST')
      return new Response('Método não permitido.', { status: 405 });

    const rateLimit = checkRateLimit(request);
    const origin = request.headers.get('Origin');
    const isProduction = env.ENVIRONMENT === 'production';

    if (!origin || typeof origin !== 'string')
      return new Response('Método não permitido.', { status: 405 });

    if (isProduction && !ALLOWED_ORIGINS.has(origin))
      return new Response('Acesso negado.', { status: 403 });

    const headers = Object.freeze({
      'Access-Control-Allow-Origin': isProduction ? origin : '*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json; charset=utf-8',
      'X-RateLimit-Limit': String(RATE_LIMIT.MAX_REQUESTS),
      'X-RateLimit-Remaining': String(rateLimit.remaining),
    });

    const response = (response: unknown, status = 200) =>
      new Response(JSON.stringify(response), { status, headers });

    try {
      if (!rateLimit.available)
        return response(
          {
            message:
              'Limite de requisições excedido. Tente novamente mais tarde.',
          },
          429
        );

      const rawBody = await request.text();
      const { repositoryURL: repositoryRaw, ...body } = JSON.parse(rawBody);

      if (
        typeof repositoryRaw !== 'string' ||
        repositoryRaw.indexOf('?') !== -1
      )
        return response({ message: 'Repositório inválido.' }, 400);

      if (!isValidParam(body.npm))
        return response({ message: 'Pacote npm inválido.' }, 400);

      if (!isValidParam(body.homebrew))
        return response({ message: 'Pacote Homebrew inválido.' }, 400);

      if (!isValidParam(body.pypi))
        return response({ message: 'Pacote PyPi inválido.' }, 400);

      if (!isValidParam(body.chocolatey))
        return response({ message: 'Pacote Chocolatey inválido.' }, 400);

      if (!isValidParam(body.vscode))
        return response(
          { message: 'ID do Visual Code Studio Marketplace inválido.' },
          400
        );

      const repositoryURL = repositoryRaw.trim();
      const npm = sanitizeParam(body.npm);
      const homebrew = sanitizeParam(body.homebrew);
      const pypi = sanitizeParam(body.pypi);
      const chocolatey = sanitizeParam(body.chocolatey);
      const vscode = sanitizeParam(body.vscode);

      let key = repositoryURL;
      if (typeof npm === 'string') key += `:${npm}`;
      if (typeof homebrew === 'string') key += `:${homebrew}`;
      if (typeof pypi === 'string') key += `:${pypi}`;
      if (typeof chocolatey === 'string') key += `:${chocolatey}`;
      if (typeof vscode === 'string') key += `:${vscode}`;

      const { organization, repository } = extractRepository(repositoryURL);

      return cache.stats.has(key)
        ? response(cache.stats.get(key))
        : response(
            await processProject(
              {
                description: '', // unused
                repository: repositoryURL,
                npm,
                homebrew,
                pypi,
                chocolatey,
                vscode,
              },
              ({ results }) => {
                const score = getScore({
                  closedIssues: results?.closedIssues?.value,
                  contributors: results?.contributors?.value,
                  forks: results?.forks?.value,
                  homebrew: results?.homebrew?.value,
                  issues: results?.issues?.value,
                  npm: results?.npm?.value,
                  pypi: results?.pypi?.value,
                  stars: results?.stars?.value,
                  commits: results?.commits,
                  chocolatey: results?.chocolatey?.value,
                  repositoryDependents: results?.repositoryDependents?.value,
                  vscode: results?.vscode?.value,
                });

                const result = {
                  ...results,
                  score,
                  username: organization,
                  repository,
                };

                cache.stats.set(key, result);

                return {
                  ...results,
                  score,
                  username: organization,
                  repository,
                };
              }
            )
          );
    } catch (error) {
      if (env.ENVIRONMENT !== 'production') console.error(error);

      return response({ message: 'Ops! Erro interno.' }, 500);
    }
  },
};
