import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function cleanPages(hookId) {
    try {
        const pagesDir = path.join(__dirname, '../pages');
        const filePath = path.join(pagesDir, `${hookId}.b64`);
        await fs.unlink(filePath);
        console.log(`[cleanPages] File ${hookId}.b64 deleted`);
    } catch (error) {
        if (error.code !== 'ENOENT') {
            console.error(`Errore eliminando il file ${hookId}.b64:`, error);
        }
    }
}