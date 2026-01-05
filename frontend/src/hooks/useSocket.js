import { useEffect, useRef } from 'react';
import io from 'socket.io-client';
import consola from 'consola';

export const useSocket = (onNewRequest) => {
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = io('/', {
      transports: ['websocket'],
      query: { hookId: localStorage.getItem('hookId') }, // Send hookId so server knows which client
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      consola.debug("Socket connected");
    });

    socket.on('disconnect', () => {
      consola.debug('Socket disconnected');
    });

    socket.on('connect_error', (err) => {
      consola.error('Socket connection error:', err.message);
    });

    socket.on("new-request", (json) => {
      try {
        let data = JSON.parse(json);
        onNewRequest?.(data);
      } catch (e) {
        consola.error("Error parsing JSON");
      }
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [onNewRequest]);

};