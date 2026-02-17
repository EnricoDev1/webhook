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

export async function cleanAllPages() {
    try {
        const pagesDir = path.join(__dirname, '../../pages');
        const files = await fs.readdir(pagesDir);
        for (const file of files) {
            if (file === 'default.page') continue;
            const filePath = path.join(pagesDir, file);
            try {
                await fs.unlink(filePath);
                consola.debug(`[cleanAllPages] File ${file} deleted`);
            } catch (error) {
                if (error.code !== 'ENOENT') {
                    consola.error(`[cleanAllPages] Error deleting file ${file}:`, error);
                }
            }
        }
        consola.debug(`[cleanAllPages] All pages cleaned except default`);
    } catch (error) {
        consola.error(`[cleanAllPages] Error reading pages directory:`, error);
    }
}