function getSafeBody(body, contentType) {
    if (!body || Object.keys(body).length === 0) {
        return null;
    }

    // For JSON, form-data (without files), urlencoded
    if (typeof body === 'object' && !Buffer.isBuffer(body)) {
        try {
            return JSON.parse(JSON.stringify(body)); // Deep clone to remove circular refs
        } catch {
            return { _note: '[Body could not be serialized]' };
        }
    }

    // Raw text or other text-based
    if (typeof body === 'string') {
        return body.length > 10000 ? body.substring(0, 10000) + '\n\n... [truncated]' : body;
    }

    // Binary body (e.g., application/octet-stream)
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
        // Do NOT send full buffer in real-time emit (too heavy for WebSocket)
        // buffer: file.buffer?.length > 1000 ? '[large file]' : file.buffer,
        preview: file.buffer
            ? file.buffer.toString('base64').substring(0, 200) + (file.buffer.length > 100 ? '...' : '')
            : null,
    });

    if (Array.isArray(files)) {
        return files.map(formatFile);
    }

    // Object format (e.g., req.files['avatar'], req.files['photos'][] )
    return Object.keys(files).reduce((acc, field) => {
        acc[field] = Array.isArray(files[field]) ? files[field].map(formatFile) : formatFile(files[field]);
        return acc;
    }, {});
}

export { getSafeBody, getFilesInfo }