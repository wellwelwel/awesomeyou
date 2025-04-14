/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

import type { StatsPropos } from '@site/src/@types/projects';
import { setResult } from '@site/src/helpers/services/stats/set-result';

export const issuesClosed = async (
  organization: string,
  repository: string
): Promise<StatsPropos> => {
  const results = await (
    await fetch(
      `https://img.shields.io/github/issues-closed/${organization}/${repository}.json?cacheSeconds=1`
    )
  ).json();

  return setResult(results.value.replace(/closed/, ''));
};
