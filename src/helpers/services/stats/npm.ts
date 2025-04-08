/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

import { setResult } from '@site/src/helpers/services/stats/set-result';

export const npmDownloads = async (npm: string) => {
  const results = await (
    await fetch(`https://img.shields.io/npm/dm/${npm}.json?cacheSeconds=1`)
  ).json();

  return setResult(results.value.replace(/month/, 'mês'));
};
