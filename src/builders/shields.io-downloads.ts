/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

import { setResult } from '@site/src/helpers/services/stats/set-result';

type Options = {
  registry: 'npm' | 'homebrew/installs' | 'pypi' | 'packagist' | 'chocolatey';
  period?: keyof typeof periods;
  condition?: (path: string) => void | Error;
};

const periods = {
  dm: {
    regex: /month/,
    replacement: 'mês',
  },
  dy: {
    regex: /year/,
    replacement: 'ano',
  },
  dt: undefined,
} as const;

export const createShieldsIoDownloads = (options: Options) => {
  const { registry, condition, period }: Options = {
    period: 'dm',
    ...options,
  };

  return async (path: string) => {
    if (typeof condition === 'function') {
      const error = condition(path);

      if (error instanceof Error) throw error;
    }

    const response: any = await (
      await fetch(
        `https://img.shields.io/${registry}/${period}/${path}.json?cacheSeconds=1`
      )
    ).json();

    const result = periods[period]
      ? response.value.replace(
          periods[period].regex,
          periods[period].replacement
        )
      : response.value;

    return setResult(result);
  };
};
