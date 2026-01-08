let io;
const clients = new Map();
const disconnected = new Map();

function initClients(socketServer) {
    io = socketServer;

    io.on('connection', (socket) => {
        const hookId = socket.handshake.query.hookId;
        clients.set(hookId, socket);
        disconnected.delete(hookId);
        socket.on('disconnect', (reason) => {
            disconnected.set(hookId, Date.now());
        });
    });
}

function attachClients(req, res, next) {
    req.io = io;
    req.clients = clients;
    req.disconnected = disconnected;
    next();
}

export { initClients, attachClients, clients, disconnected };
