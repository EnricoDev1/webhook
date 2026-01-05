let io;
const clients = new Map();

// inizializza io e clients
function initClients(socketServer) {
    io = socketServer;

    io.on('connection', (socket) => {
        const hookId = socket.handshake.query.hookId;
        clients.set(hookId, socket);
    });
}

// middleware per allegare io e clients a req
function attachClients(req, res, next) {
    req.io = io;
    req.clients = clients;
    next();
}

export { initClients, attachClients };
