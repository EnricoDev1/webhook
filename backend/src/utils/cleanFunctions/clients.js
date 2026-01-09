import { clients } from "../../middlewares/AttachClients.js";
import consola from "consola";

export function cleanClients(hookId) {
    const removed = clients.delete(hookId);

    if (removed) {
        consola.debug(`[cleanClients] Client ${hookId} removed from Map`);
    } else {
        consola.debug(`[cleanClients] Client ${hookId} not found in Map`);
    }
}