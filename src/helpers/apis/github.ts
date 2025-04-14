import { cache } from '@site/src/configs/cache';
import { env } from '@site/src/polyfills/env';

const token = env.GITHUB_TOKEN;

export const GitHubAPI = async (endpoint: string) => {
  const cached = cache.GitHub.get(endpoint);

  if (cached) return cached;

  const headers = {
    ...(token ? { Authorization: `Bearer ${token}` } : Object.create(null)),
    'User-Agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36',
  };

  const response = await fetch(`https://api.github.com/${endpoint}`, {
    headers,
  });

  if (!response.ok) throw new Error('GitHub API error');

  const results = response.json();

  cache.GitHub.set(endpoint, results);

  return results;
};
