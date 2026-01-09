import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { v4 as uuid } from 'uuid';
import { setUser } from './User.js';
import { setRequestByUser } from './Request.js';
import { getFilesInfo, getSafeBody, normalizeClient } from '../utils/requestSanitizer.js';
import { isBase64, isValidContentType, isValidStatusCode } from '../utils/pageValidation.js';
import consola from 'consola';

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
    
    consola.debug(`new request arrived on hook ${hookId}`)
    
    setRequestByUser(req, res, data)
};

const createPage = async (req, res) => {
    try {
        const { statusCode, contentType, content } = req.body;

        const sc = isValidStatusCode(statusCode) ? statusCode : 200;
        const ct = isValidContentType(contentType) ? contentType : 'text/html';

        if (!isBase64(content))
            return res.status(400).json({ error: 'Base64 non valido' });

        const body = Buffer.from(content, 'base64').toString('utf8');

        const fileData = `${sc}\n${ct}\n\n${body}`;
        await fs.writeFile(path.join(__dirname, '../pages', `${req.userToken}.page`), fileData, 'utf8');

        res.json({ message: 'Page saved' });
    } catch (err) {
        consola.error(err);
        res.status(500).json({ error: 'Error saving page' });
    }
};

const getPage = async (req, res) => {
    try {
        const pagesDir = path.join(__dirname, '../pages');
        let filePath = path.join(pagesDir, `${req.userToken}.page`);
        let data;
        try {
            data = await fs.readFile(filePath, 'utf8');
        } catch {
            try {
                filePath = path.join(pagesDir, 'default.page');
                data = await fs.readFile(filePath, 'utf8');
            } catch {
                return res.status(404).json({ error: 'Page not found' });
            }
        }

        const [statusLine, contentTypeLine, , ...bodyLines] = data.split('\n');

        const statusCode = parseInt(statusLine, 10);
        const contentType = contentTypeLine;
        const body = bodyLines.join('\n');
 
        const content = Buffer.from(body, 'utf8').toString('base64');

        res.json({
            statusCode,
            contentType,
            content
        });
    } catch (err) {
        consola.error(err);
        res.status(500).json({ error: 'Error reading page content' });
    }
};

export { createHook, sendHookMessage, createPage, getPage };