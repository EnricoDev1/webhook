import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import consola from "consola";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function cleanPages(hookId) {
    try {
        const pagesDir = path.join(__dirname, '../../pages');
        const filePath = path.join(pagesDir, `${hookId}.page`);
        await fs.unlink(filePath);
        consola.debug(`[cleanPages] File ${hookId}.page deleted`);
    } catch (error) {
        if (error.code !== 'ENOENT') {
            consola.error(`Error deleting file ${hookId}.page:`, error);
        }
    }
}