/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

import type { GitHubStatsProps, ShieldStatsProps } from '@site/src/@types/apis';
import { GitHubAPI } from '@site/src/helpers/apis/github';
import { delay } from '@site/src/helpers/delay';

const getManually = async (
  organization: string,
  repository: string
): Promise<string> => {
  const data = await GitHubAPI<GitHubStatsProps>(
    `repos/${organization}/${repository}`
  );
  const license = data?.license;

  if (!license) return 'not specified';
  if (String(license?.spdx_id).includes('NOASSERTION')) return 'Other';

  return String(license?.spdx_id || 'Other');
};

export const license = async (
  organization: string,
  repository: string
): Promise<string> => {
  const maxRetries = 10;
  const lag = 10;
  const retryDelay = 1000 + lag;

  let processed: string | undefined;
  let attempts = 0;

  while (attempts < maxRetries) {
    attempts++;

    const results: ShieldStatsProps = await (
      await fetch(
        `https://img.shields.io/github/license/${organization}/${repository}.json?cacheSeconds=1`
      )
    ).json();

    if (
      results.value !== 'Unable to select next GitHub token from pool' &&
      results.value !== 'invalid'
    ) {
      processed = results.value.includes('identifiable')
        ? 'Other'
        : results.value;

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

  return processed || 'Other';
};
