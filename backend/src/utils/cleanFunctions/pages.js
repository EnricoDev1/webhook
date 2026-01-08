import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function cleanPages(hookId) {
    try {
        const pagesDir = path.join(__dirname, '../../pages');
        const filePath = path.join(pagesDir, `${hookId}.page`);
        await fs.unlink(filePath);
        console.log(`[cleanPages] File ${hookId}.page deleted`);
    } catch (error) {
        if (error.code !== 'ENOENT') {
            console.error(`Error deleting file ${hookId}.page:`, error);
        }
    }
}