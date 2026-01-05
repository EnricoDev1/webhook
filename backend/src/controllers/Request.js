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

        // Controllo utente con funzione riutilizzabile
        const result = await checkUser(redisClient, token);
        if (!result.ok) {
            return res.status(result.error === 'Token mancante' ? 401 : 404)
                .json({ error: result.error });
        }

        const requestId = data.id;
        delete data.id;
        const request = data;
        await redisClient.hSet(`user:${token}:requests`, requestId, JSON.stringify(request));

        const filePath = path.join(__dirname, '../pages', `${token}.b64`);
        const defaultPath = path.join(__dirname, '../pages', 'default.b64');

        let pageToSend = defaultPath;

        try {
            await fs.access(filePath);
            pageToSend = filePath;
        } catch (_) {
            pageToSend = defaultPath;
        }

        const base64Content = await fs.readFile(pageToSend, 'utf8');
        const htmlContent = Buffer.from(base64Content, 'base64').toString('utf8');

        res.setHeader('Content-Type', 'text/html');
        return res.send(htmlContent);

    } catch (err) {
        console.error(err);
        return res.status(500).send('Errore server');
    }
};

const getRequestByUser = async (req, res) => {
    const redisClient = req.redisClient;
    const token = req.headers.authorization;
    const requests = await redisClient.hGetAll(`user:${token}:requests`);

    const parsedRequests = Object.entries(requests).map(([id, data]) => ({
        id,
        ...JSON.parse(data)
    }));
    return res.json(parsedRequests);
};

const deleteRequestByUser = async (req, res) => {
    const redisClient = req.redisClient;
    const requestId = req.params.id;
    const token = req.headers.authorization;

    if (!requestId) return res.status(400).json({ error: "Parametri mancanti: requestId" });

    const deleted = await redisClient.hDel(`user:${token}:requests`, requestId);

    if (deleted === 0) return res.status(404).json({ error: "Richiesta non trovata" });

    return res.json({ message: "Richiesta eliminata con successo" });
};

const deleteAllRequestByUser = async (req, res) => {
    try {
        const redisClient = req.redisClient;
        const token = req.headers.authorization;
        const deleted = await redisClient.del(`user:${token}:requests`);

        if (deleted === 0) {
            return res.status(404).json({ error: "Nessuna richiesta da eliminare" });
        }

        return res.json({ message: "Tutte le richieste eliminate con successo" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Errore interno" });
    }
};

export { setRequestByUser, getRequestByUser, deleteRequestByUser, deleteAllRequestByUser };
