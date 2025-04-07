/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

import { setResult } from './set-result.js';

export const commitsByMaintainer = async (
  organization: string,
  repository: string,
  maintainer: string
) => {
  const results = await (
    await fetch(
      `https://img.shields.io/github/commit-activity/t/${organization}/${repository}.json?authorFilter=${maintainer}`
    )
  ).json();

  return setResult(results.value);
};
