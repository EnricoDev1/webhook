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

export { setUser};