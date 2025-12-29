import { v4 as uuid } from 'uuid';

const setRequestByUser = async (req,res,data) => {
    const redisClient = req.redisClient;
    const token = data.hookId;
    if (!token) return res.status(401).json({ error: "Token mancante" });

    const exists = await redisClient.sIsMember('users:set', token);
    if (!exists) return res.status(404).json({ error: "Utente non trovato" });

    const requestId = uuid();
    const request = {
        body: data
    };

    await redisClient.hSet(`user:${token}:requests`, requestId, JSON.stringify(request));

    return res.json({ message: 'Richiesta aggiunta', requestId });
};

const getRequestByUser = async (req, res) => {
    const redisClient = req.redisClient;
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Token mancante" });

    const exists = await redisClient.sIsMember('users:set', token);
    if (!exists) return res.status(404).json({ error: "Utente non trovato" });

    const requests = await redisClient.hGetAll(`user:${token}:requests`);

    const parsedRequests = Object.entries(requests).map(([id, data]) => ({
        id,
        body: JSON.parse(data)
    }));

    return res.json(parsedRequests);
};

const deleteRequestByUser = async (req, res) => {
    const redisClient = req.redisClient;
    const token = req.headers.authorization?.split(" ")[1];
    const requestId = req.params.id;

    if (!token) return res.status(401).json({ error: "Token mancante" });
    if (!requestId) return res.status(400).json({ error: "Parametri mancanti: requestId" });

    const exists = await redisClient.sIsMember('users:set', token);
    if (!exists) return res.status(404).json({ error: "Utente non trovato" });

    const deleted = await redisClient.hDel(`user:${token}:requests`, requestId);

    if (deleted === 0) return res.status(404).json({ error: "Richiesta non trovata" });

    return res.json({ message: "Richiesta eliminata con successo" });
};

export {setRequestByUser, getRequestByUser, deleteRequestByUser };