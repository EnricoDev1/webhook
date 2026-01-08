import mime from 'mime-types'
import {StatusCodes} from 'http-status-codes'

const isBase64 = (str) => {
    if (typeof str !== 'string') return false;
    if (str.length % 4 !== 0) return false;

    return /^[A-Za-z0-9+/]+={0,2}$/.test(str);
};

const isValidStatusCode = (code) => {
    const num = parseInt(code, 10);
    return !isNaN(num) && Object.values(StatusCodes).includes(num);
};

const isValidContentType = (type) => {
    if (typeof type !== 'string') return false;

    if (!/^[\w.+-]+\/[\w.+-]+$/.test(type)) return false;

    if (!mime.extension(type)) return false;

    return true;
};

export { isBase64, isValidStatusCode, isValidContentType }