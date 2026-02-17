import { disconnected } from "../../middlewares/AttachClients.js";
import { cleanClients } from "./clients.js";
import { cleanDb, cleanAllDb } from "./database.js";
import { cleanPages, cleanAllPages } from "./pages.js";
import consola from "consola";

const CLEANUP_INTERVAL = parseInt(process.env.CLEANUP_INTERVAL, 10)
const TTL = parseInt(process.env.TTL, 10)

export async function cleanUp() {
    const now = Date.now();
    for (const [hookId, timestamp] of disconnected) {
        if (now - timestamp > TTL) {
            consola.debug(`[Cleanup] Starting cleanup for hookId: ${hookId}`);
            cleanClients(hookId)
            cleanDb(hookId)
            cleanPages(hookId)
            disconnected.delete(hookId)
        }
    }

}

export async function cleanAll() {
    consola.debug(`[Cleanup] Starting full cleanup`);
    cleanAllDb()
    cleanAllPages()
    consola.debug(`[Cleanup] Full cleanup completed`);
}

setInterval(cleanUp, CLEANUP_INTERVAL);
