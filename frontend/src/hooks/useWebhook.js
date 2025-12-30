import { useState, useEffect } from 'react';
import { BASE_URL } from '../config';

export const useWebhook = () => {
  const [webhookUrl, setWebhookUrl] = useState('');
  const [loading, setLoading] = useState(true);

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
      let hookId = localStorage.getItem('hookId');
      if (!hookId) {
        hookId = await getHookId();
        if (hookId) localStorage.setItem('hookId', hookId);
      }
      if (hookId) setWebhookUrl(`${BASE_URL}/${hookId}`);
      setLoading(false);
    };
    generateWebhookUrl();
  }, []);

  return { webhookUrl, loading };
};