import express from 'express';
import apiRoutes from './routes/Api.js'
import { redisConnection } from './database/connection.js';
import {Server} from 'socket.io';
import http from 'http';
import cors from 'cors';
import { emitMessage } from './utils.js';

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

const io = new Server(server, {
    cors : {
        "origin": "*"
    }
});

let redisClient;
const clients = new Map();

(async () => {
    redisClient = await redisConnection();
})();

io.on('connection', (socket) => {
    socket.on("register", (hookId) => {
        clients.set(hookId, socket);
    });
});

app.use((req, res, next) => {
    req.io = io;
    req.clients = clients;
    req.redisClient = redisClient;

    next();
});

app.use('/', apiRoutes);

server.listen(3000, async () => {
    console.log("Server in ascolto su http://localhost:3000")
});