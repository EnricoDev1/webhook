function getSafeBody(body) {
    if (!body || Object.keys(body).length === 0) {
        return null;
    }

    if (typeof body === 'object' && !Buffer.isBuffer(body)) {
        try {
            return JSON.parse(JSON.stringify(body));
        } catch {
            return { _note: '[Body could not be serialized]' };
        }
    }

    if (typeof body === 'string') {
        return body.length > 10000 ? body.substring(0, 10000) + '\n\n... [truncated]' : body;
    }

    if (Buffer.isBuffer(body)) {
        return {
            _type: 'binary',
            encoding: 'base64',
            preview: body.toString('base64').substring(0, 200),
            length: body.length,
            truncated: body.length > 10000,
        };
    }

    return { _raw: '[Unsupported body type]' };
}

function getFilesInfo(files) {
    if (!files || (Array.isArray(files) && files.length === 0) || (typeof files === 'object' && Object.keys(files).length === 0)) {
        return null;
    }

    const formatFile = (file) => ({
        fieldname: file.fieldname,
        originalname: file.originalname,
        encoding: file.encoding,
        mimetype: file.mimetype,
        size: file.size,
        truncated: file.truncated || false,
        preview: file.buffer
            ? file.buffer.toString('base64').substring(0, 200) + (file.buffer.length > 100 ? '...' : '')
            : null,
    });

    if (Array.isArray(files)) {
        return files.map(formatFile);
    }

    return Object.keys(files).reduce((acc, field) => {
        acc[field] = Array.isArray(files[field]) ? files[field].map(formatFile) : formatFile(files[field]);
        return acc;
    }, {});
}

function normalizeClient(req) {
    if (!req) {
        return null;
    }

    const normalizeIp = (ip) => {
        if (!ip || typeof ip !== 'string') {
            return null;
        }

        if (ip.startsWith('::ffff:')) {
            return ip.slice(7);
        }

        if (ip === '::1') {
            return '127.0.0.1';
        }

        return ip;
    };

    const ip =
        normalizeIp(req.headers["x-real-ip"]) ||
        normalizeIp(req.headers["x-forwarded-for"]) ||
        normalizeIp(req.connection?.remoteAddress) ||
        normalizeIp(req.socket?.remoteAddress);

    const ips = Array.isArray(req.ips)
        ? req.ips.map(normalizeIp).filter(Boolean)
        : [];

    if (!ip && ips.length === 0) {
        return null;
    }

    return {
        ip,
        ips,
    };
}

export { getSafeBody, getFilesInfo, normalizeClient }