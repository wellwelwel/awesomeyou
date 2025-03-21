import { createLRU } from 'lru.min';
import { RateLimitData } from './rate-limit.js';

export const cache = {
  stats: createLRU({ max: 1000 }),
  rateLimit: createLRU<string, RateLimitData>({ max: 1000 }),
};
