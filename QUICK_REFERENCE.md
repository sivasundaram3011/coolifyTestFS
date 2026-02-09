# 🚀 Quick Reference - Full-Stack Bayer Template

## 📋 Template Configuration

**Type:** `bayer-vite-react-fullstack`  
**Version:** 2.0.0  
**Updated:** February 5, 2026

## 🏗️ Stack

```
Frontend:  React 18 + Vite + TypeScript + Tailwind CSS
Backend:   Node.js + Express + Mongoose
Database:  MongoDB 7.0
Deploy:    Docker Compose + Coolify
Design:    Bayer Design System (strict)
```

## ⚡ Quick Commands

```bash
# Start development (hot reload)
make dev

# Start production
make prod

# View logs
make logs

# Test API
make test-api

# Stop everything
make stop
```

## 🌐 Service URLs

| Service | Dev | Production |
|---------|-----|------------|
| Frontend | http://localhost:5173 | http://localhost:80 |
| Backend | http://localhost:3000 | http://localhost:3000 |
| MongoDB | localhost:27017 | localhost:27017 |
| Health Check | http://localhost:3000/health | http://localhost:3000/health |

## 📡 API Endpoints

```
GET    /health              - Server health
GET    /api/items           - List items
GET    /api/items/:id       - Get item
POST   /api/items           - Create item
PUT    /api/items/:id       - Update item
DELETE /api/items/:id       - Delete item
```

## 📁 Key Files

| File | Purpose |
|------|---------|
| `.bayer/config.json` | Template configuration |
| `.bayer/prompt` | AI agent instructions |
| `.env.example` | Environment template |
| `docker-compose.yml` | Production setup |
| `docker-compose.dev.yml` | Development setup |
| `DEPLOYMENT.md` | Deployment guide |
| `Makefile` | Quick commands |
| `start.sh` | Quick start script |

## 🎨 Bayer Colors (Frontend)

**Text:**
- `.lmnt-theme-primary`
- `.lmnt-theme-secondary`
- `.lmnt-theme-on-surface`

**Background:**
- `.lmnt-theme-primary-bg`
- `.lmnt-theme-secondary-bg`
- `.lmnt-theme-surface-bg`

**Tailwind:**
- `bg-bayer-primary-400`
- `text-bayer-secondary-700`

## 🔧 Adding New API Endpoint

1. **Model:** `backend/src/models/YourModel.js`
2. **Controller:** `backend/src/controllers/yourController.js`
3. **Routes:** `backend/src/routes/yourRoutes.js`
4. **Register:** Add to `backend/src/index.js`
5. **Frontend:** Add method to `src/lib/api.ts`

## 🐳 Docker Files

| File | Purpose |
|------|---------|
| `Dockerfile` | Frontend production |
| `Dockerfile.dev` | Frontend development |
| `backend/Dockerfile` | Backend production |
| `backend/Dockerfile.dev` | Backend development |

## 📦 Project Structure

```
├── src/                    # Frontend (React)
│   ├── lib/api.ts         # API client
│   └── components/        # React components
├── backend/               # Backend (Node.js)
│   └── src/
│       ├── config/        # DB config
│       ├── models/        # Mongoose models
│       ├── controllers/   # Logic
│       └── routes/        # API routes
├── docker-compose*.yml    # Orchestration
└── .bayer/               # Template config
```

## 🔐 Environment Variables

**Required in `.env`:**
```env
MONGO_ROOT_PASSWORD=change_this
MONGO_DATABASE=app_db
VITE_API_URL=http://localhost:3000
```

## 🚀 Deploy to Coolify

1. Push to Git
2. Create service → Docker Compose
3. Connect repository
4. Set environment variables
5. Deploy

See `DEPLOYMENT.md` for details.

## 📚 Documentation

- `SETUP_COMPLETE.md` - Overview
- `DEPLOYMENT.md` - Full deployment guide
- `backend/README.md` - API documentation

## 🐛 Troubleshooting

```bash
# Check logs
make logs

# Health check
make health

# MongoDB shell
make mongo-shell

# Backend shell
make backend-shell
```

## 💡 Development Tips

- Frontend code in `/src` auto-reloads
- Backend code in `/backend/src` auto-reloads
- MongoDB data persists in volumes
- Use `make dev` for local development
- Use `make prod` for production testing

---

**Need help?** Check `DEPLOYMENT.md` or run `make help`
