import { createClient } from 'redis';

const redisConnection = async () => {
    const redisClient = createClient({
        socket: {
            host: process.env.REDIS_HOST || "redis",
            port: process.env.REDIS_PORT || 6379,
        },
    });

    redisClient.on("error", (err) => console.error("Redis Client Error", err));
    await redisClient.connect();
    redisClient.on("connect", () => console.log("Redis client connected successfully"));
    return redisClient;
}

export { redisConnection };
