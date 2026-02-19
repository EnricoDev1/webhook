![Language](https://img.shields.io/badge/language-JavaScript-yellow)
![License](https://img.shields.io/badge/license-MIT-blue)
![Docker](https://img.shields.io/badge/docker-ready-cyan)

# Real-time simple webhook system

## Architecture

- **Frontend**: React + Vite + Socket.io (client) + TailwindCSS
- **Backend**: Node.js + Express + Socket.io (server) + Redis
- **Proxy**: Nginx (Reverse proxy).

## Installation and Startup

Ensure to fill the `.env` file with proper values.

1. Clone the repository:
   ```bash
   git clone https://github.com/EnricoDev1/webhook.git
   cd webhook
   ```

2. Start the application:
   ```bash
   docker compose up --build -d
   ```

3. Access the application:
   - Frontend: `http://localhost:8080`
   - Webhook Endpoint: `http://localhost:8080/{uuid}`

## Folder Structure

```text
.
├── client/          # React frontend
├── server/          # Express backend & Socket.io logic
├── nginx/           # Nginx configuration files
├── docker-compose.yml
└── .env.example
```

## Environment Variables

Configure these variables in your `.env` file.

| Variable | Description | Default Value | Required |
|----------|-------------|---------------|----------|
| `REDIS_HOST` | Hostname for the Redis connection used by the backend. | `redis` | Yes |
| `REDIS_PORT` | Port for the Redis connection. | `6379` | Yes |
| `TTL` | Time-to-live (TTL) in milliseconds for disconnected webhook sessions before they are cleaned up. | `3600000` (1 hour) | Yes |
| `CLEANUP_INTERVAL` | Interval in milliseconds at which the cleanup task runs to remove expired sessions. | `600000` (10 minutes) | Yes |
| `MAX_REQUEST_SIZE` | Maximum allowed size of the request body for creating a page, in bytes. | `2048` (2 KB) | Yes |
| `BACKEND_PORT` | Port on which the backend server listens inside its container. | `3000` | Yes |
| `NODE_LOG_LEVEL` | Logging level for the backend application (e.g., `debug`, `info`, `success`, `warn`, `error`). | `debug` | No (defaults to `debug` if not set) |
| `FRONTEND_PORT` | Port for the frontend application. Note that the Vite server is currently configured to use port 5173. | `5173` | Yes |
| `VITE_LOG_LEVEL` | Logging level for the frontend build/development server. | `debug` | No |


## License

This project is licensed under the MIT License.
