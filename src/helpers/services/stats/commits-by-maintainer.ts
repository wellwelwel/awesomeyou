/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

import { setResult } from './set-result.js';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const commitsByMaintainer = async (
  organization: string,
  repository: string,
  maintainer: string
) => {
  const maxRetries = 60;
  const retryDelay = 1000;

  let attempts = 0;
  let results;

  while (attempts < maxRetries) {
    attempts++;

    results = await (
      await fetch(
        `https://img.shields.io/github/commit-activity/t/${organization}/${repository}.json?authorFilter=${maintainer}`
      )
    ).json();

    if (results.value !== 0 || attempts >= maxRetries) break;

    await delay(retryDelay);
  }

  const processed = setResult(results.value);

  if (processed.value === 0) {
    throw new Error(
      `Failed to generate the number of commits for ${maintainer} in ${organization}/${repository}`
    );
  }

  return setResult(results.value);
};
