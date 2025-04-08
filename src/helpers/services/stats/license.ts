/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

export const license = async (organization: string, repository: string) => {
  const results = await (
    await fetch(
      `https://img.shields.io/github/license/${organization}/${repository}.json?cacheSeconds=1`
    )
  ).json();

  return results.value.includes('identifiable') ? 'Other' : results.value;
};
