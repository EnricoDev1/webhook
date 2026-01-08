export const getHookId = async () => {
  const res = await fetch('/api/hookId', {
    method: 'POST'
  });
  if (!res.ok) throw new Error('Failed to get hookId');
  const data = await res.json();
  return data.id;
};

export const fetchRequests = async (token) => {
  const res = await fetch('/api/db/request', {
    headers: {
      'Authorization': `${token}`
    },
  });
  if (!res.ok) throw new Error('Failed to fetch requests');
  return res.json();
};

export const deleteRequest = async (id, token) => {
  const res = await fetch(`/api/db/request/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `${token}`,
    },
  });
  if (!res.ok) throw new Error('Failed to delete request');
};

export const deleteRequests = async (token) => {
  const res = await fetch(`/api/db/request`, {
    method: 'DELETE',
    headers: {
      'Authorization': token
    }
  });
  if (!res.ok) throw new Error('Failed to delete reqeusts');
}

export const fetchUserPage = async (token) => {
  const res = await fetch(`/api/page`, {
    method: 'GET', 
    headers: {
      'Authorization': token
    }
  });
  if (!res.ok) throw new Error('Failed to retrieve user page');

  return res.json();
}

export const updateUserPage = async (token, content) => {
  const res = await fetch(`/api/page`, {
    method: 'POST', 
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(content)
  });
  if (!res.ok) throw new Error('Failed to update user page');
}