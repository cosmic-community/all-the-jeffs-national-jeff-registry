interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  Object.keys(store).forEach(key => {
    if (store[key].resetTime < now) {
      delete store[key];
    }
  });
}, 5 * 60 * 1000);

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetTime: number;
}

export function rateLimit(
  identifier: string,
  limit: number = 5,
  windowMs: number = 15 * 60 * 1000 // 15 minutes
): RateLimitResult {
  const now = Date.now();
  const key = identifier;

  if (!store[key] || store[key].resetTime < now) {
    store[key] = {
      count: 1,
      resetTime: now + windowMs
    };
    return {
      success: true,
      remaining: limit - 1,
      resetTime: store[key].resetTime
    };
  }

  if (store[key].count >= limit) {
    return {
      success: false,
      remaining: 0,
      resetTime: store[key].resetTime
    };
  }

  store[key].count++;
  return {
    success: true,
    remaining: limit - store[key].count,
    resetTime: store[key].resetTime
  };
}