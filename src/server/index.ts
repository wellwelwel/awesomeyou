import { createLRU } from 'lru.min';
import { extractRepository } from '@site/src/helpers/extract-repository';
import { processProject } from '@site/src/helpers/generate-stats';
import { getScore } from '@site/src/helpers/get-score';

const cache = {
  stats: createLRU({ max: 100 }),
};

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const response = (response: unknown) =>
  new Response(JSON.stringify(response), {
    status: 200,
    headers,
  });

export default {
  async fetch(request: Request) {
    try {
      if (request.method !== 'POST') {
        return new Response('Method Not Allowed', {
          status: 405,
        });
      }

      const rawBody = await request.text();
      const { repositoryURL } = JSON.parse(rawBody);
      const { organization, repository } = extractRepository(repositoryURL);

      return cache.stats.has(repositoryURL)
        ? response(cache.stats.get(repositoryURL))
        : response(
            await processProject(
              {
                repository: repositoryURL.trim(),
                description: '',
                madeInBrazil: true,
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

                cache.stats.set(repositoryURL, result);

                return {
                  ...results,
                  score,
                  username: organization,
                  repository,
                };
              }
            )
          );
    } catch {
      return new Response('Internal Error', {
        status: 500,
        headers,
      });
    }
  },
};
