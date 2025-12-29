import express from 'express';
import apiRoutes from './routes/Api.js'
import { redisConnection } from './database/connection.js';
import {Server} from 'socket.io';
import http from 'http';
import cors from 'cors';
import {sendHookMessage} from './controllers/hookController.js'
import { emitMessage } from './utils.js';

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parse application/x-www-form-urlencoded
app.use(express.text()); // Parse text/plain
app.use(express.raw({ type: 'application/octet-stream' }));

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

app.all('/:hookId', sendHookMessage);
app.all('/:hookId/*splat', sendHookMessage);

server.listen(3000, async () => {
    console.log("Server in ascolto su http://localhost:3000")
});