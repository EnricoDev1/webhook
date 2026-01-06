let redisClient;

function initRedis(client) {
    redisClient = client;
}

function attachRedis(req, res, next) {
    req.redisClient = redisClient;
    next();
}

export { initRedis, attachRedis, redisClient };
