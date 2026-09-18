# Dockerization frontend

React/Vite frontend for the Dockerization lesson. In development Vite proxies
`/api` to the local backend on port `3333`. In the Docker image Nginx proxies
`/api` to the Compose service `backend:3333`.

## Development

```bash
npm install
npm run dev
```

The frontend uses the same API path in development and production:

```env
VITE_API_URL=/api/v1
```

The dev proxy is configured in `vite.config.js`; the production proxy is
configured in `nginx.conf`.

## Alternative: separate env files by mode

If development and production have genuinely different public API origins and
no same-origin proxy is available, Vite can use:

```env
# .env.development
VITE_API_URL=http://localhost:3333/api/v1
```

```env
# .env.production
VITE_API_URL=https://api.example.com/api/v1
```

These files are local environment files, must not contain secrets, and remain
ignored by Git. The API address is embedded during the frontend build, so a
changed address requires a new build.
