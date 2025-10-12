export const JWT_SECRET = process.env.JWT_SECRET || 'segretone';

export function emitMessage(socket, event, message) {
    socket.emit(event, message);
}