/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

import type { StatsPropos } from '@site/src/@types/projects.js';
import { env } from 'node:process';
import { localeNumber, setResult } from './set-result.js';

const token = env.GITHUB_TOKEN;
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const getCommitsByMaintainerManually = async (
  organization: string,
  repository: string,
  maintainer: string
): Promise<StatsPropos> => {
  const perPage = 100;
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined;

  let page = 1;
  let totalCommits = 0;

  while (true) {
    const response = await fetch(
      `https://api.github.com/repos/${organization}/${repository}/commits?author=${maintainer}&per_page=${perPage}&page=${page}`,
      { headers }
    );

    if (!response.ok) throw new Error('GitHub API error');

    const commits = await response.json();

    totalCommits += commits.length;

    if (commits.length < 100) break;

    page++;
  }

  const results = {
    value: totalCommits,
    label: localeNumber(totalCommits),
  };

  console.log(
    results,
    maintainer,
    `${organization}/${repository}`,
    '(Fallback)'
  );

  return results;
};

export const commitsByMaintainer = async (
  organization: string,
  repository: string,
  maintainer: string
): Promise<StatsPropos> => {
  const maxRetries = 10;
  const lag = 10;
  const retryDelay = 1000 + lag;

  let processed: StatsPropos | undefined;
  let attempts = 0;

  while (attempts < maxRetries) {
    attempts++;

    const results = await (
      await fetch(
        `https://img.shields.io/github/commit-activity/t/${organization}/${repository}.json?authorFilter=${maintainer}&cacheSeconds=1`
      )
    ).json();

    processed = setResult(results.value);

    console.log(processed, maintainer, `${organization}/${repository}`);

    if (processed.value !== 0 || attempts >= maxRetries) break;

    await delay(retryDelay);
  }

  if (!processed || processed.value === 0) {
    try {
      processed = await getCommitsByMaintainerManually(
        organization,
        repository,
        maintainer
      );
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }

    if (!processed || processed.value === 0)
      throw new Error(
        `Failed to generate the number of commits for ${maintainer} in ${organization}/${repository}`
      );
  }

  return processed;
};
