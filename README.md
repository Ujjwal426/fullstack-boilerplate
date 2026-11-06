# Fullstack Boilerplate (Express + MongoDB + React)

Starter for coding rounds: clone, install, run, and start adding features.

```
backend/   Express + Mongoose, health check at GET /api/health
frontend/  React (Vite), calls the backend health check on load
```

## Prerequisites
- Node.js 18+
- MongoDB running locally (`mongodb://127.0.0.1:27017`) or a MongoDB Atlas URI

## Run it

Backend (terminal 1):
```bash
cd backend
cp .env.example .env      # edit MONGO_URI if needed
npm install
npm run dev               # http://localhost:5000
```

Frontend (terminal 2):
```bash
cd frontend
cp .env.example .env
npm install
npm run dev               # http://localhost:5173
```

Open http://localhost:5173. The page calls `GET http://localhost:5000/api/health` and shows the result.

Quick check without the UI:
```bash
curl http://localhost:5000/api/health
# {"status":"ok","uptime":12,"timestamp":"...","database":"connected"}
```
If Mongo is down the API returns HTTP 503 with `"status":"degraded"`, and the server stays up.

## Where to add code

Backend (`backend/src`):
- `models/` Mongoose schemas (e.g. `Task.js`)
- `controllers/` request handlers
- `routes/` Express routers; register new ones in `app.js` like `app.use("/api/tasks", taskRoutes)`
- `config/db.js` Mongo connection

Frontend (`frontend/src`):
- `api.js` has a `request()` helper; add functions like `getTasks = () => request("/api/tasks")`
- `App.jsx` main component; add components under `components/`

## Notes
- The backend uses ES modules (`"type": "module"`): use `import`/`export default`, and include the `.js` extension in relative imports (e.g. `import taskRoutes from "./routes/tasks.js"`).
- CORS allows `http://localhost:5173` (change `CORS_ORIGIN` in `backend/.env`).
- `.env` files are git-ignored; `.env.example` files are committed.
