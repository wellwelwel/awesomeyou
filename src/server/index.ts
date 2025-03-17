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
};

const isValidParam = (param: unknown): boolean => {
  if (typeof param === 'undefined') return true;
  if (typeof param === 'string' && param.length <= 64) return true;

  return false;
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
      const { repositoryURL, npm, homebrew, pypi, chocolatey, vscode } =
        JSON.parse(rawBody);

      if (typeof repositoryURL !== 'string')
        return new Response('Invalid repository URL.', {
          status: 400,
        });

      if (!isValidParam(npm))
        return new Response('Invalid npm package.', {
          status: 400,
        });

      if (!isValidParam(homebrew))
        return new Response('Invalid Homebrew package.', {
          status: 400,
        });

      if (!isValidParam(pypi))
        return new Response('Invalid PyPi package.', {
          status: 400,
        });

      if (!isValidParam(chocolatey))
        return new Response('Invalid Chocolatey package.', {
          status: 400,
        });

      if (!isValidParam(vscode))
        return new Response('Invalid Visual Code Studio Marketplace ID.', {
          status: 400,
        });

      let key = repositoryURL.trim();

      if (typeof npm === 'string') key += `:${npm.trim()}`;
      if (typeof homebrew === 'string') key += `:${homebrew.trim()}`;
      if (typeof pypi === 'string') key += `:${pypi.trim()}`;
      if (typeof chocolatey === 'string') key += `:${chocolatey.trim()}`;
      if (typeof vscode === 'string') key += `:${vscode.trim()}`;

      const { organization, repository } = extractRepository(repositoryURL);

      return cache.stats.has(key)
        ? response(cache.stats.get(key))
        : response(
            await processProject(
              {
                description: '', // unused
                repository: repositoryURL.trim(),
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

      return new Response('Internal Error.', {
        status: 500,
        headers,
      });
    }
  },
};
