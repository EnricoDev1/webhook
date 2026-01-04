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

    setInterval(async () => {
        try {
            console.log("[JOB] Cleaning Redis...");
            await redisClient.flushDb();
            console.log("[JOB] Done");
        } catch (err) {
            console.error("[JOB] Error: ", err);
        }
    }, process.env.REDIS_TTL);

    return redisClient;
}

export { redisConnection };
