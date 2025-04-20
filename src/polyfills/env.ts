/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

export const env: NodeJS.ProcessEnv = (() => {
  try {
    return process?.env || Object.create(null);
  } catch (error) {
    return Object.create(null);
  }
})();
