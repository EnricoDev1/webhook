import { v4 as uuid } from 'uuid';

const setUser = async (req, res) => {
    const redisClient = req.redisClient;
    const users = await redisClient.lRange('users:list', 0, -1);
    const userId = req.body.id;
    if (!users.includes(userId.toString())) {
        await redisClient.rPush('users:list', userId);
        return res.send('Utente aggiunto alla lista');
    }
    return res.send('Utente già presente nella lista');
};

const getUsers = async (req, res) => {
    const redisClient = req.redisClient;
    const users = await redisClient.lRange('users:list', 0, -1);
    res.json(users);
};


const setRequestByUser = async (req, res) => {
    const redisClient = req.redisClient;
    let request = {}
    request.id = uuid();
    request.body = req.body;
    await redisClient.rPush(`user:${req.params.id}:requests`, JSON.stringify(request));
};

const getRequestbyUser = async (req, res) => {
    const redisClient = req.redisClient;
    const requests = await redisClient.lRange(`user:${req.params.id}:requests`, 0, -1);
    const parsedRequests = requests.map(request => JSON.parse(request));
    res.json(parsedRequests);
};



export { setUser, getUsers, setRequestByUser, getRequestbyUser };