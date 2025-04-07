/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

/* Using Fisher-Yates */
export const randomize = <T>(list: T[]): T[] => {
  const listLength = list.length - 1;

  for (let current = listLength; current > 0; current--) {
    const random = Math.floor(Math.random() * (current + 1));

    [list[current], list[random]] = [list[random], list[current]];
  }

  return list;
};
