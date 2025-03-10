import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL!);
const RATE_LIMIT_WINDOW = 60; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 3;

export async function rateLimit(ip: string): Promise<boolean> {
  const currentRequests = await redis.incr(ip);

  if (currentRequests === 1) {
    await redis.expire(ip, RATE_LIMIT_WINDOW);
  }

  return currentRequests > RATE_LIMIT_MAX_REQUESTS;
}
