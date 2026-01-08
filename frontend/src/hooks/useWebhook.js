import { useState, useEffect } from 'react';
import { BASE_URL } from '../config';
import { getHookId } from '../services/api';

export const useWebhook = () => {
  const [webhookUrl, setWebhookUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [hookId, setHookId] = useState('');

  useEffect(() => {
    const generateWebhookUrl = async () => {
      let id = localStorage.getItem('hookId');
      
      if (!id) {
        id = await getHookId();
        if (id) localStorage.setItem('hookId', id);
      }
      
      setWebhookUrl(`${BASE_URL}/${id}`); 
      setHookId(id);
      setLoading(false);
    };
    generateWebhookUrl();
  }, []);

  return { hookId, webhookUrl, loading };
};