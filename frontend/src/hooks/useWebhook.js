import { useState, useEffect } from 'react';
import { BASE_URL } from '../config';

export const useWebhook = () => {
  const [webhookUrl, setWebhookUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [hookId, setHookId] = useState('');

  const getHookId = async () => {
    const response = await fetch('/api/hookId', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Failed to get hook ID');
    const data = await response.json();
    return data.id;
  };

  useEffect(() => {
    const generateWebhookUrl = async () => {
      let id = localStorage.getItem('hookId');
      
      if (!id) {
        id = await getHookId();
        if (id) localStorage.setItem('hookId', id);
      }
      if (id) setWebhookUrl(`${BASE_URL}/${id}`);
      
      setHookId(id);
      setLoading(false);
    };
    generateWebhookUrl();
  }, []);

  return { hookId, webhookUrl, loading };
};