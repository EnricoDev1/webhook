import { useEffect, useState } from 'react';
import { fetchRequests, deleteRequest } from '../services/api';

export function useRequests() {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    const load = async () => {
      const token = localStorage.getItem('hookId');
      const data = await fetchRequests(token);

      setRequests(
        data.slice(0, 20).map(item => ({
          id: item.id,
          method: item.method,
          url: `/api/webhook/${item.id}`,
          timestamp: new Date(),
          statusCode: 200,
          headers: item.headers || {},
          body: JSON.stringify(item, null, 2),
          ip: item.ip || '127.0.0.1',
          time: Math.floor(Math.random() * 1000),
        }))
      );
    };

    load();
  }, []);

  const remove = async (id) => {
    const token = localStorage.getItem('hookId');
    await deleteRequest(id, token);
    setRequests(r => r.filter(x => x.id !== id));
    if (selectedRequest?.id === id) setSelectedRequest(null);
  };

  return { requests, selectedRequest, setSelectedRequest, remove };
}
