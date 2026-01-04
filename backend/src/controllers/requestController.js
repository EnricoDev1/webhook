import { v4 as uuid } from 'uuid';
import { checkUser } from '../utils/checkUser.js';

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
        
        const requestId = uuid();
        const request = data;
       
        await redisClient.hSet(`user:${token}:requests`, requestId, JSON.stringify(request));

        return res.json({ message: 'Richiesta aggiunta', requestId });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Errore interno' });
    }
};


const getRequestByUser = async (req, res) => {
    const redisClient = req.redisClient;
    const token = req.headers.authorization;
    const requests = await redisClient.hGetAll(`user:${token}:requests`);

    const parsedRequests = Object.entries(requests).map(([id, data]) => ({
        id,
        body: JSON.parse(data)
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

export { setRequestByUser, getRequestByUser, deleteRequestByUser };