/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

import type { StatsPropos } from '@site/src/@types/projects';
import { GitHubAPI } from '@site/src/helpers/apis/github';
import { delay } from '@site/src/helpers/delay';
import { setResult } from '@site/src/helpers/services/stats/set-result';

const getManually = async (
  organization: string,
  repository: string
): Promise<StatsPropos> => {
  const data = await GitHubAPI(
    `search/issues?q=is:issue+is:open+repo:${organization}/${repository}`
  );

  const stat = Number(data.total_count);

  const results = {
    value: stat,
    label: stat.toLocaleString(),
  };

  return results;
};

export const issues = async (
  organization: string,
  repository: string
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
        `https://img.shields.io/github/issues/${organization}/${repository}.json?cacheSeconds=1`
      )
    ).json();

    if (
      results.value !== 'Unable to select next GitHub token from pool' &&
      results.value !== 'invalid'
    ) {
      processed = setResult(results.value.replace(/open/, ''));
      break;
    }

    if (attempts >= maxRetries) break;

    await delay(retryDelay);
  }

  if (!processed) {
    try {
      processed = await getManually(organization, repository);
    } catch {}
  }

  return (
    processed || {
      value: 0,
      label: '0',
    }
  );
};
