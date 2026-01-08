import { useEffect, useState } from 'react';
import { fetchUserPage, updateUserPage } from '../services/api';
import consola from 'consola';

export function useEdit() {
    const [content, setContent] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const load = async () => {
            const token = localStorage.getItem('hookId');
            try {
                const data = await fetchUserPage(token);
                setContent(data);
            } catch(e) {
                setError(e);
            }
        };

        load();
    }, []);

    const updateContent = async (newResponse) => {
        const token = localStorage.getItem('hookId');
        await updateUserContent(token, newResponse);
    };

    return { content, error, updateContent };
}
