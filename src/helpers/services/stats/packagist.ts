/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

import { createShieldsIoDownloads } from '@site/src/builders/shields.io-downloads';

export const packagistDownloads = createShieldsIoDownloads({
  registry: 'packagist',
  condition(path) {
    const [user, repo] = path.split('/');

    if (!user || user.trim().length === 0 || !repo || repo.trim().length === 0)
      return new Error('Pacote Packagist inválido.', { cause: 400 });
  },
});
