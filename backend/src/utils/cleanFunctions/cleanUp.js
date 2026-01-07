import { disconnected } from "../../middlewares/AttachClients.js";
import { cleanClients } from "./clients.js";
import { cleanDb } from "./database.js";
import { cleanPages } from "./pages.js";
const CLEANUP_INTERVAL = parseInt(process.env.CLEANUP_INTERVAL, 10)
const TTL = parseInt(process.env.TTL, 10)

export async function cleanUp() {
    const now = Date.now();
    for (const [hookId, timestamp] of disconnected) {
        if (now - timestamp > TTL) {
            console.log(`[Cleanup] Starting cleanup for hookId: ${hookId}`);
            await cleanClients(hookId)
            await cleanDb(hookId)
            await cleanPages(hookId)
            disconnected.delete(hookId)
            console.log(`[Cleanup] Cleanup completed for hookId: ${hookId}\n`);
        }
    }

}

setInterval(cleanUp, CLEANUP_INTERVAL);
