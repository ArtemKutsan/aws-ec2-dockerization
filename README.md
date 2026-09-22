# Dockerization lesson

Учебный проект показывает, как запустить React frontend, Express backend и
MySQL в Docker Compose. Доменная сущность — пост без изображения:
`userId`, `title` и `text`.

## Стек

- Frontend: React, Vite и Nginx.
- Backend: Node.js, Express, Sequelize и MySQL.
- Runtime: Docker Compose.
- Database schema/data: Sequelize migrations и seeders.

AWS S3, AWS SDK, загрузка файлов и изображения постов в проекте не используются.

## Локальный Docker-запуск

Создай `app/.env` по шаблону:

```env
MYSQL_ROOT_PASSWORD=сложный_локальный_пароль
MYSQL_DATABASE=dockerization_production
VITE_API_URL=/api/v1
```

Из этой папки запусти:

```bash
docker compose up -d --build
docker compose ps
docker compose exec backend npm run db:migrate
docker compose exec backend npm run db:seed
```

Сайт открывается на `http://localhost`, backend — на
`http://localhost:3333`.

Проверки:

```bash
curl http://localhost:3333/health
curl http://localhost:3333/api/v1/posts
```

Остановить контейнеры без удаления данных:

```bash
docker compose down
```

Удалить также MySQL volume можно только осознанно:

```bash
docker compose down -v
```

## Структура

```text
app/
├── docker-compose.yml
├── backend/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── config/
│   ├── db/
│   │   ├── migrations/
│   │   ├── models/
│   │   └── seeders/
│   └── src/
└── frontend/
    ├── Dockerfile
    ├── .dockerignore
    ├── nginx.conf
    └── src/
```

## Docker Compose services

```text
mysql     → внутренняя сеть Compose, порт 3306 не опубликован
backend   → публичный API на localhost:3333
frontend  → Nginx и сайт на localhost:80
```

Все три сервиса используют `restart: unless-stopped`, поэтому после перезапуска
Docker/EC2 они запускаются автоматически, если не были остановлены вручную.

Frontend обращается к API через относительный путь `/api/v1`. Nginx проксирует
этот путь во внутренний Docker-сервис `backend:3333`. Backend-порт `3333` также
оставлен опубликованным для учебной прямой проверки API.

## Документация частей проекта

- [Backend README](backend/README.md) — локальный запуск backend, environment, migrations, seeders и API.
- [Frontend README](frontend/README.md) — Vite dev proxy, frontend build и Nginx.

Этот README остаётся общей точкой входа для запуска всего приложения. Внутренние
рабочие flows проекта хранятся отдельно и намеренно не подключаются ссылками в
публикуемый `app`.
