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
    const entry = store[key];
    if (entry && entry.resetTime < now) {
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

  const existingEntry = store[key];
  
  if (!existingEntry || existingEntry.resetTime < now) {
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

  if (existingEntry.count >= limit) {
    return {
      success: false,
      remaining: 0,
      resetTime: existingEntry.resetTime
    };
  }

  existingEntry.count++;
  return {
    success: true,
    remaining: limit - existingEntry.count,
    resetTime: existingEntry.resetTime
  };
}