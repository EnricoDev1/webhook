import { createClient } from 'redis';
import consola from 'consola';

const redisConnection = async () => {
    const redisClient = createClient({
        socket: {
            host: process.env.REDIS_HOST || "redis",
            port: process.env.REDIS_PORT || 6379,
        },
    });

    redisClient.on("error", (err) => consola.error("Redis Client Error", err));
    await redisClient.connect();
    redisClient.on("connect", () => consola.success("Redis client connected successfully"));
    return redisClient;
}

export { redisConnection };
