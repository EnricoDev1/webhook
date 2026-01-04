import { useEffect, useState } from 'react';
import { fetchRequests, deleteRequest } from '../services/api';

export function useRequests() {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    const load = async () => {
      const token = localStorage.getItem('hookId');
      const data = await fetchRequests(token);

      setRequests(data);
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
