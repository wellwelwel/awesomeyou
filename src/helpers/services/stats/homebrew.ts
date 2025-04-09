/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

import { createShieldsIoDownloads } from '@site/src/builders/shields.io-downloads';

export const homebrewDownloads = createShieldsIoDownloads({
  registry: 'homebrew/installs',
});
