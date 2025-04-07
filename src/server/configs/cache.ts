/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

import type { ProjectStats } from '@site/src/@types/projects.js';
import { createLRU } from 'lru.min';
import { RateLimitData } from './rate-limit.js';

export type StatsCache = ProjectStats & {
  username: string;
  repository: string;
};

export const cache = {
  stats: createLRU<string, StatsCache>({ max: 1000 }),
  rateLimit: createLRU<string, RateLimitData>({ max: 1000 }),
};
