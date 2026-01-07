import { redisClient } from "../../middlewares/AttachRedis.js";

export async function cleanDb(token) {
    try {
        await redisClient.del(`user:${token}:requests`);
        await redisClient.sRem('users:set', token);
        console.log(`[cleanDb] Redis data for ${token} cleaned`);
    } catch (error) {
        console.error(`Errore eliminando l'utente ${token} da Redis:`, error);
    }
}