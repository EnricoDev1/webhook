const checkUser = async (redisClient, token) => {
    if (!token) {
        return { ok: false, error: 'Missing token' };
    }

    const exists = await redisClient.sIsMember('users:set', token);

    if (!exists) {
        return { ok: false, error: 'User not found' };
    }

    return { ok: true };
};

export { checkUser };