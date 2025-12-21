const setUser = async (req, res) => {
    const redisClient = req.redisClient;
    const userId = req.body.id;
    if (!userId) {
        return res.status(400).json({ error: "Parametri mancanti: id" });
    }
    const added = await redisClient.sAdd('users:set', userId);

    if (added === 1) {
        return res.json({ message: 'Utente aggiunto', userId });
    } else {
        return res.status(400).json({ error: 'Utente già presente' });
    }
};
const getUser = async (req, res) => {
    const redisClient = req.redisClient;
    const { id: userId } = req.params;

    const exists = await redisClient.sIsMember('users:set', userId);
    if (!exists) return res.status(404).json({ error: 'Utente non trovato' });

    res.json({ id: userId });
};

const getUsers = async (req, res) => {
    const redisClient = req.redisClient;
    const users = await redisClient.sMembers('users:set');
    res.json(users);
};


export { setUser, getUsers, getUser};