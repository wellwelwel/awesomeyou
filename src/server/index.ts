import { createLRU } from 'lru.min';
import { extractRepository } from '@site/src/helpers/extract-repository';
import { processProject } from '@site/src/helpers/generate-stats';
import { getScore } from '@site/src/helpers/get-score';

const ALLOWED_ORIGINS = new Set([
  'https://awesomeyou.io',
  'https://www.awesomeyou.io',
]);

const cache = {
  stats: createLRU({ max: 1000 }),
  // rateLimit: createLRU({ max: 1000 }),
};

const regex = {
  packageName: /[^a-z0-9-_.@\/]/gi,
};

const isValidParam = (param: undefined | string): boolean => {
  if (typeof param === 'undefined') return true;
  if (typeof param !== 'string') return false;
  if (!(param.length >= 2 && param.length <= 64)) return false;
  if (regex.packageName.test(param)) return false;

  return true;
};

const sanitizeParam = (param: unknown): undefined | string => {
  if (typeof param !== 'string') return undefined;

  const input = param.trim().replace(regex.packageName, '');

  return !input ? undefined : input;
};

export default {
  async fetch(request: Request, env: Env) {
    if (request.method !== 'POST')
      return new Response('Method Not Allowed.', {
        status: 405,
      });

    const origin = request.headers.get('Origin');
    const isProduction = env.ENVIRONMENT === 'production';

    if (!origin || typeof origin !== 'string')
      return new Response('Method Not Allowed.', {
        status: 405,
      });

    if (isProduction && !ALLOWED_ORIGINS.has(origin))
      return new Response('Access Denied.', {
        status: 403,
      });

    const headers = Object.freeze({
      'Access-Control-Allow-Origin': isProduction ? origin : '*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
    });

    const response = (response: unknown) =>
      new Response(JSON.stringify(response), {
        status: 200,
        headers,
      });

    try {
      const rawBody = await request.text();
      const { repositoryURL: repositoryRaw, ...body } = JSON.parse(rawBody);

      if (typeof repositoryRaw !== 'string')
        return new Response('Repositório inválido.', {
          status: 400,
        });

      if (!isValidParam(body.npm))
        return new Response('Pacote npm inválido.', {
          status: 400,
        });

      if (!isValidParam(body.homebrew))
        return new Response('Pacote Homebrew inválido.', {
          status: 400,
        });

      if (!isValidParam(body.pypi))
        return new Response('Pacote PyPi inválido.', {
          status: 400,
        });

      if (!isValidParam(body.chocolatey))
        return new Response('Pacote Chocolatey inválido.', {
          status: 400,
        });

      if (!isValidParam(body.vscode))
        return new Response('ID do Visual Code Studio Marketplace inválido.', {
          status: 400,
        });

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

      return new Response('Ops! Erro interno.', {
        status: 500,
        headers,
      });
    }
  },
};
