import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';

import { router } from './routes/index.js'
import { redisConnection } from './database/connection.js';
import { initRedis, attachRedis } from './middlewares/AttachRedis.js';
import { initClients, attachClients } from './middlewares/AttachClients.js';
import { cleanUp } from './utils/cleanUp.js';

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parse application/x-www-form-urlencoded
app.use(express.text()); // Parse text/plain
app.use(express.raw({ type: 'application/octet-stream' }));

//Redis
const redisClient = await redisConnection();
initRedis(redisClient);
app.use(attachRedis);

//Socket
const io = new Server(server, {
    cors: {
        "origin": "*"
    }
});
initClients(io);
app.use(attachClients);
app.use('/', router);
cleanUp();
server.listen(3000, async () => {
    console.log("Server in ascolto su http://localhost:3000")
});