import { clients } from "../../middlewares/AttachClients.js";

export function cleanClients(hookId) {
    const removed = clients.delete(hookId);

    if (removed) {
        console.log(`[cleanClients] Client ${hookId} removed from Map`);
    } else {
        console.log(`[cleanClients] Client ${hookId} not found in Map`);
    }
}