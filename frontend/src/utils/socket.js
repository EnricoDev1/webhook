import {io} from 'socket.io-client';

const BACKEND_URL = "http://localhost";
const socket = io(BACKEND_URL);

export function emitMessage(event, message) {
    console.log(event);
    console.log(message);
    
    socket.emit(event, message);
}

socket.on("msg", (msg) => {
  console.log(msg);
});

