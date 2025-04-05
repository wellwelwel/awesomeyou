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
