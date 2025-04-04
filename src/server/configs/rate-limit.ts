import { cache } from './cache.js';

export type RateLimitData = {
  count: number;
  timestamp: number;
  blocked: boolean;
  resetAt?: number;
};

const getRateLimitKey = (request: Request): string => {
  const ip =
    request.headers.get('CF-Connecting-IP') ||
    request.headers.get('X-Forwarded-For') ||
    'UNKNOWN';

  return String(ip).slice(0, 19);
};

export const RATE_LIMIT = {
  MAX_REQUESTS: 10,
  WINDOW_MS: 60000,
  BLOCK_DURATION_MS: 60000,
};

export const checkRateLimit = (
  request: Request
): {
  available: boolean;
  remaining: number;
  resetAt?: number;
} => {
  const now = Date.now();
  const key = getRateLimitKey(request);
  const data = cache.rateLimit.get(key);

  if (data?.blocked && now < data.resetAt!)
    return { available: false, remaining: 0, resetAt: data.resetAt };

  if (!data || now - data.timestamp >= RATE_LIMIT.WINDOW_MS) {
    cache.rateLimit.set(key, {
      count: 1,
      timestamp: now,
      blocked: false,
    });
    return { available: true, remaining: RATE_LIMIT.MAX_REQUESTS - 1 };
  }

  const count = data.count + 1;

  if (count > RATE_LIMIT.MAX_REQUESTS) {
    const resetAt = now + RATE_LIMIT.BLOCK_DURATION_MS;

    cache.rateLimit.set(key, {
      count,
      timestamp: data.timestamp,
      blocked: true,
      resetAt,
    });

    return { available: false, remaining: 0, resetAt };
  }

  cache.rateLimit.set(key, {
    ...data,
    count,
  });

  return {
    available: true,
    remaining: RATE_LIMIT.MAX_REQUESTS - count,
  };
};
