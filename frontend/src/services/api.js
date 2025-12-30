export const getHookId = async () => {
  const res = await fetch('http://localhost/api/hookId', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('Failed to get hookId');
  const data = await res.json();
  return data.id;
};

export const fetchRequests = async (token) => {
  const res = await fetch('http://localhost/api/db/request', {
    headers: {
      'Authorization': `${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) throw new Error('Failed to fetch requests');
  return res.json();
};

export const deleteRequest = async (id, token) => {
  const res = await fetch(`http://localhost/api/db/request/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) throw new Error('Failed to delete request');
};
