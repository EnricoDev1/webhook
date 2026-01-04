import { v4 as uuid } from 'uuid';
import { setUser } from './userController.js';
import { setRequestByUser } from './requestController.js';
import {getFilesInfo, getSafeBody} from '../utils.js';

const createHook = (req, res) => {
    const hookId = uuid();
    setUser(req, res, hookId);
};

const sendHookMessage = (req, res) => {
    const hookId = req.params.hookId;
    const reqId = uuid();
    const client = req.clients.get(hookId);

    const data = {
        hookId: hookId,
        id: reqId,
        timestamp: Date.now(), 

        request: {
            method: req.method.toUpperCase(),
            url: req.originalUrl,
            path: req.path,
            baseUrl: req.baseUrl,
            hostname: req.hostname,
            protocol: req.protocol,

            headers: req.headers,

            query: req.query,
            params: req.params,

            body: getSafeBody(req.body, req.headers['content-type']),

            files: getFilesInfo(req.files),
        },

        client: {
            ip: req.ip || req.connection.remoteAddress || req.socket.remoteAddress,
            ips: req.ips,
        },
    };
    
    if(client) {
        client.emit("new-request", JSON.stringify(data));
    } 

    setRequestByUser(req, res, data)
};

export { createHook, sendHookMessage };