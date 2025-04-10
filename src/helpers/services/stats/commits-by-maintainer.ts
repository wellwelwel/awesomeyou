/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

import type { StatsPropos } from '@site/src/@types/projects.js';
import { setResult } from './set-result.js';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const commitsByMaintainer = async (
  organization: string,
  repository: string,
  maintainer: string
): Promise<StatsPropos> => {
  const maxRetries = 60;
  const retryDelay = 1000 + 100;

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
    throw new Error(
      `Failed to generate the number of commits for ${maintainer} in ${organization}/${repository}`
    );
  }

  return processed;
};
