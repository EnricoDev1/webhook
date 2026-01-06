let io;
const clients = new Map();
const disconnected = new Map();
// inizializza io e clients
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

// middleware per allegare io e clients a req
function attachClients(req, res, next) {
    req.io = io;
    req.clients = clients;
    req.disconnected = disconnected;
    next();
}

export { initClients, attachClients, clients, disconnected };
