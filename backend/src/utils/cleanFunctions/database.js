import { redisClient } from "../../middlewares/AttachRedis.js";
import consola from "consola";

export async function cleanDb(token) {
    try {
        await redisClient.del(`user:${token}:requests`);
        await redisClient.sRem('users:set', token);
        consola.debug(`[cleanDb] Redis data for ${token} cleaned`);
    } catch (error) {
        consola.error(`Error deleting user ${token} from Redis:`, error);
    }
}

export async function cleanAllDb() {
    try {
        await redisClient.flushDb();
        consola.debug(`[cleanAllDb] Full Redis cleanup completed`);
    } catch (error) {
        consola.error(`[cleanAllDb] Error during full Redis cleanup:`, error);
    }
}