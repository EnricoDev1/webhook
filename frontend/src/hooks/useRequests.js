import { useEffect, useState } from 'react';
import { getHookId, fetchRequests, deleteRequest, deleteRequests } from '../services/api';

export function useRequests() {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    const load = async () => {
      const token = localStorage.getItem('hookId');
      let data;
      try {
        data = await fetchRequests(token);
      } catch (e) {
        let newId = await getHookId();
        localStorage.setItem("hookId", newId);
        window.location.reload();
      } finally {
        setRequests(data);
      }
    };

    load();
  }, []);

  const remove = async (id) => {
    const token = localStorage.getItem('hookId');
    await deleteRequest(id, token);
    setRequests(r => r.filter(x => x.id !== id));
    if (selectedRequest?.id === id) setSelectedRequest(null);
  };

  const addRequest = (request) => {
    requests.push(request);
  }

  const deleteAllRequests = async () => {
    const token = localStorage.getItem('hookId');
    await deleteRequests(token);
    console.log("dicoawadawd");

    setRequests([]);
    setSelectedRequest(null);
  }

  return { requests, selectedRequest, setSelectedRequest, addRequest, remove, deleteAllRequests };
}
