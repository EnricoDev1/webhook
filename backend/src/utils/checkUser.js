const checkUser = async (redisClient, token) => {
    if (!token) {
        return { ok: false, error: 'Token mancante' };
    }

    const exists = await redisClient.sIsMember('users:set', token);

    if (!exists) {
        return { ok: false, error: 'Utente non trovato' };
    }

    return { ok: true };
};

export { checkUser };