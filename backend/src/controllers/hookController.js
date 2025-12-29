import { v4 as uuid } from 'uuid';
import { setUser } from './userController.js';

const createHook = (req, res) => {
    const hookId = uuid();
    setUser(req, res, hookId);
};

const sendHookMessage = (req, res) => {
    const hookId = req.params.id;
    const reqId = uuid();
    const client = req.clients.get(hookId);

    let data = {
        hookId: hookId,
        id: reqId,
        timestamp: new Date().toISOString(),

        request: {
            method: req.method,
            url: req.originalUrl,
            headers: req.headers,
            query: req.query,
            params: req.params,
            body: req.body
        },

        client: {
            ip: req.ip,
        },
    };

    // client.emit("new-request", data);
    res.send(data);
};

export { createHook, sendHookMessage };