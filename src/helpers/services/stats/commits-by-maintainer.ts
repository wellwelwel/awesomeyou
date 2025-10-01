/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

import type { GitHubList, ShieldStatsProps } from '@site/src/@types/apis.js';
import type { StatsProps } from '@site/src/@types/projects.js';
import { GitHubAPI } from '../../apis/github.js';
import { localeNumber, setResult } from './set-result.js';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const getCommitsByMaintainerManually = async (
  organization: string,
  repository: string,
  maintainer: string
): Promise<StatsProps> => {
  const perPage = 100;

  let page = 1;
  let totalCommits = 0;

  while (true) {
    const data = await GitHubAPI<GitHubList>(
      `repos/${organization}/${repository}/commits?author=${maintainer}&per_page=${perPage}&page=${page}`
    );

    totalCommits += data.length;

    if (data.length < perPage) break;

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
): Promise<StatsProps> => {
  const maxRetries = 10;
  const lag = 10;
  const retryDelay = 1000 + lag;

  let processed: StatsProps | undefined;
  let attempts = 0;

  while (attempts < maxRetries) {
    attempts++;

    const results: ShieldStatsProps = await (
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
