import express from 'express';
import apiRoutes from './routes/api.js'
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import { redisConnection } from './database/connection.js';
const app = express();

app.use(cookieParser("pisello"));

let redisClient;

(async () => {
    redisClient = await redisConnection();
})();

app.use('/', apiRoutes);
app.use('/api', apiRoutes);
// Routes
app.get("/set/:key/:value", async (req, res) => {
    const { key, value } = req.params;
    await redisClient.set(key, value);
    res.send(`Key "${key}" set with value "${value}"`);
});

app.get("/get/:key", async (req, res) => {
    const { key } = req.params;
    const value = await redisClient.get(key);
    res.send(value ? `Value: ${value}` : "Key not found");
});

app.listen(3000, async () => {
    console.log("Server in ascolto su http://localhost:3000")
});