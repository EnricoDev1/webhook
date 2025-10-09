import {REDIS_TTL} from '../utils.js'
import {v4 as uuid} from 'uuid';

const setRequest = async (req, res) => {
    const redisClient = req.redisClient;
    await redisClient.set(uuid(), req.params.id, { EX: REDIS_TTL });
    res.send('Chiave impostata');

}

const getRequest = async (req, res) => {
    const redisClient = req.redisClient;
    const keys = await redisClient.keys('*');
    const values = await Promise.all(keys.map(key => redisClient.get(key)));
    const value = Object.fromEntries(keys.map((key, index) => [key, values[index]]));
    res.json(value);
}

export { setRequest, getRequest }