import { useEffect, useRef } from 'react';
import io from 'socket.io-client';

export const useSocket = (onNewRequest) => {
  const socketRef = useRef(null);

  useEffect(() => {
    // Connect only once
    const socket = io('/', {
      transports: ['websocket'],
      query: { hookId: localStorage.getItem('hookId') }, // Send hookId so server knows which client
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    socket.on('connect_error', (err) => {
      console.error('Socket connection error:', err.message);
    });

    socket.on("new-request", (json) => {
      console.log(json);
      try {
        let data = JSON.parse(json);
        onNewRequest?.(data);
        console.log("ok");
      } catch (e) {
        console.error("Error parsing JSON");
      }
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [onNewRequest]);

};