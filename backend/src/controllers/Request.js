import path from 'path';
import fs from 'fs/promises';
import { checkUser } from '../utils/checkUser.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const setRequestByUser = async (req, res, data) => {
    try {
        const redisClient = req.redisClient;
        const token = data.hookId;

        const result = await checkUser(redisClient, token);
        if (!result.ok) {
            return res.status(result.error === 'Missing token' ? 401 : 404)
                .json({ error: result.error });
        }

        const requestId = data.id;
        delete data.id;
        const request = data;
        await redisClient.hSet(`user:${token}:requests`, requestId, JSON.stringify(request));

        const filePath = path.join(__dirname, '../pages', `${token}.page`);
        const defaultPath = path.join(__dirname, '../pages', 'default.page');

        let pageToSend = defaultPath;

        try {
            await fs.access(filePath);
            pageToSend = filePath;
        } catch (_) {
            pageToSend = defaultPath;
        }
        const raw = await fs.readFile(pageToSend, 'utf8');

        const [statusLine, contentTypeLine, , ...bodyLines] = raw.split("\n");

        const statusCode = parseInt(statusLine, 10);
        const contentType = contentTypeLine;
        const body = bodyLines.join('\n');

        res.status(statusCode);
        res.set('Content-Type', contentType);
        res.send(body);

    } catch (err) {
        console.error(err);
        return res.status(500).send('Server error');
    }
};

const getRequestByUser = async (req, res) => {
    const redisClient = req.redisClient;
    const requests = await redisClient.hGetAll(`user:${req.userToken}:requests`);

    const parsedRequests = Object.entries(requests).map(([id, data]) => ({
        id,
        ...JSON.parse(data)
    }));
    return res.json(parsedRequests);
};

const deleteRequestByUser = async (req, res) => {
    const redisClient = req.redisClient;
    const requestId = req.params.id;

    if (!requestId) return res.status(400).json({ error: "Missing parameters: requestId" });

    const deleted = await redisClient.hDel(`user:${req.userToken}:requests`, requestId);

    if (deleted === 0) return res.status(404).json({ error: "Request not found" });

    return res.json({ message: "Succesfully deleted request" });
};

const deleteAllRequestByUser = async (req, res) => {
    try {
        const redisClient = req.redisClient;
        const deleted = await redisClient.del(`user:${req.userToken}:requests`);

        if (deleted === 0) {
            return res.status(404).json({ error: "No requests to delete" });
        }

        return res.json({ message: "Successfully deleted all requests" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal error" });
    }
};

export { setRequestByUser, getRequestByUser, deleteRequestByUser, deleteAllRequestByUser };
