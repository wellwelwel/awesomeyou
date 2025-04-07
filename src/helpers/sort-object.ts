/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

export const sortObjectByValues = <T extends Record<string, unknown>>(
  obj: T
): T =>
  Object.fromEntries(
    Object.entries(obj).sort(([, a], [, b]) =>
      String(a).localeCompare(String(b))
    )
  ) as T;
