import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { v4 as uuid } from 'uuid';
import { setUser } from './User.js';
import { setRequestByUser } from './Request.js';
import { getFilesInfo, getSafeBody, normalizeClient } from '../utils/requestSanitizer.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createHook = (req, res) => {
    const hookId = uuid();
    setUser(req, res, hookId);
};

const sendHookMessage = (req, res) => {
    const hookId = req.params.hookId;
    const client = req.clients.get(hookId);

    const data = {
        id: uuid(),
        hookId: hookId,
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

        client: normalizeClient(req),
    };

    if (client) {
        client.emit("new-request", JSON.stringify(data));
    }
    setRequestByUser(req, res, data)
};

const createPage = async (req, res) => {
    try {
        const hookId = req.headers.authorization;
        const content = req.body;

        if (!content || typeof content !== 'string') {
            return res.status(400).json({ error: 'File non valido' });
        }

        const pagesDir = path.join(__dirname, '../pages');
        const filePath = path.join(pagesDir, `${hookId}.b64`);

        await fs.writeFile(filePath, content, 'utf8');

        return res.json({ message: 'Pagina salvata' });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Errore salvataggio pagina' });
    }
};

export { createHook, sendHookMessage, createPage };