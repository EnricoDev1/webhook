import { checkUser } from '../utils/checkUser.js';

const requireAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const redisClient = req.redisClient;

        const result = await checkUser(redisClient, token);

        if (!result.ok) {
            return res.status(result.error === 'Token mancante' ? 401 : 404)
                .json({ error: result.error });
        }

        req.userToken = token;

        next();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Errore interno' });
    }
};

export { requireAuth };