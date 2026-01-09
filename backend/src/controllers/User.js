import consola from "consola";

const setUser = async (req, res, hookId) => {
    const redisClient = req.redisClient;
    if (!hookId) {
        return res.status(400).json({ error: "Missing parameters: id" });
    }
    const added = await redisClient.sAdd('users:set', hookId);

    if (added === 1) {
        consola.debug(`registered new hook: ${hookId}`);
        return res.json({ id: hookId });
    } else {
        return res.status(400).json({ error: 'User already logged' });
    }
};

const getUser = async (req, res) => {
    const redisClient = req.redisClient;
    const { id: userId } = req.params;

    const exists = await redisClient.sIsMember('users:set', userId);
    if (!exists) return res.status(404).json({ error: 'User not found' });

    res.json({ id: userId });
};

const getUsers = async (req, res) => {
    const redisClient = req.redisClient;
    const users = await redisClient.sMembers('users:set');
    res.json(users);
};


export { setUser, getUsers, getUser};