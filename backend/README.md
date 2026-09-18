# Dockerization backend

Express/Sequelize backend for the Dockerization lesson. The API works with
users and posts without image or S3 storage:

```text
Post = userId + title + text
```

## Local development

Create `backend/.env` from `backend/.env.example` and point it to a MySQL
server running on the local machine:

```env
PORT=3333
HOST=127.0.0.1
NODE_ENV=development
DB_HOST=localhost
DB_NAME=dockerization_development
DB_USER=root
DB_PASSWORD=your-local-mysql-password
```

Install dependencies and prepare the database:

```bash
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

The API runs at:

```text
http://localhost:3333
```

## Docker environment

When the backend runs in Compose, it receives its database settings from the
root `app/.env` through `docker-compose.yml`:

```text
DB_HOST=mysql
DB_NAME=dockerization_production
DB_USER=root
DB_PASSWORD=<MYSQL_ROOT_PASSWORD>
HOST=0.0.0.0
```

Run migrations and seeders inside the container:

```bash
docker compose exec backend npm run db:migrate
docker compose exec backend npm run db:seed
```

## API checks

```bash
curl http://localhost:3333/health
curl http://localhost:3333/api/v1/posts
```

The database schema is managed by Sequelize files in `db/migrations/`, and
demo data is managed by `db/seeders/`.

For the complete application startup, use the root [app README](../README.md).
