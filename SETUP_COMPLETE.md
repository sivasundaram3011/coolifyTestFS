# 🎉 Full-Stack Setup Complete!

Your Vite React + Node.js + MongoDB template is now configured for Coolify deployment with Docker!

## 📁 What's Been Created

### Backend (`/backend`)
- ✅ Express.js server with MongoDB connection
- ✅ RESTful API with CRUD operations
- ✅ Mongoose models and controllers
- ✅ Authentication-ready structure
- ✅ Security middleware (Helmet, CORS, Rate Limiting)
- ✅ Production & Development Dockerfiles
- ✅ Health check endpoint

### Frontend (Root)
- ✅ Existing Vite React application
- ✅ API client library (`src/lib/api.ts`)
- ✅ Example component (`src/components/ItemsList.tsx`)
- ✅ Development Dockerfile

### Docker Configuration
- ✅ `docker-compose.yml` - Production setup
- ✅ `docker-compose.dev.yml` - Development with hot reload
- ✅ MongoDB service with persistent volumes
- ✅ Health checks for all services
- ✅ Proper networking between services

### Documentation
- ✅ `DEPLOYMENT.md` - Comprehensive deployment guide
- ✅ `backend/README.md` - Backend API documentation
- ✅ `.env.example` - Environment configuration templates
- ✅ `Makefile` - Easy command shortcuts
- ✅ `start.sh` - Quick start script

## 🚀 Quick Start

### Option 1: Use the Quick Start Script
```bash
./start.sh
```

### Option 2: Manual Start

**Development Mode:**
```bash
# Copy environment file
cp .env.example .env

# Start all services
docker-compose -f docker-compose.dev.yml up --build
```

**Production Mode:**
```bash
docker-compose up --build -d
```

### Option 3: Use Makefile
```bash
make dev      # Development mode
make prod     # Production mode
make logs     # View logs
make stop     # Stop services
```

## 🌐 Access Your Application

After starting the services:

- **Frontend (Dev)**: http://localhost:5173
- **Frontend (Prod)**: http://localhost:80
- **Backend API**: http://localhost:3000
- **Health Check**: http://localhost:3000/health
- **API Docs**: http://localhost:3000/api/items

## 📡 Test the API

```bash
# Health check
curl http://localhost:3000/health

# Get all items
curl http://localhost:3000/api/items

# Create an item
curl -X POST http://localhost:3000/api/items \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Item","status":"active"}'
```

## 🐳 Deploy to Coolify

### Method 1: Docker Compose (Recommended)

1. Push your code to Git (GitHub, GitLab, etc.)
2. In Coolify:
   - Create new service → Docker Compose
   - Connect your repository
   - Set environment variables from `.env.example`
   - Deploy!

### Method 2: Separate Services

Deploy each service individually:
1. MongoDB as a Database service
2. Backend as an Application (use `backend/Dockerfile`)
3. Frontend as an Application (use root `Dockerfile`)

See `DEPLOYMENT.md` for detailed instructions.

## 🔧 Environment Variables

**Important:** Update these in `.env` before deploying:

```env
MONGO_ROOT_PASSWORD=<strong-password>     # Change this!
MONGO_DATABASE=app_db
BACKEND_PORT=3000
FRONTEND_PORT=80
VITE_API_URL=http://localhost:3000       # Update for production
```

## 📝 Project Structure

```
.
├── frontend/              # React Vite app (root directory)
│   ├── src/
│   │   ├── lib/api.ts           # API client
│   │   └── components/          # React components
│   ├── Dockerfile               # Production
│   └── Dockerfile.dev           # Development
│
├── backend/              # Node.js API
│   ├── src/
│   │   ├── config/             # Database config
│   │   ├── models/             # Mongoose models
│   │   ├── controllers/        # Business logic
│   │   ├── routes/             # API endpoints
│   │   └── index.js            # Server entry
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml          # Production orchestration
├── docker-compose.dev.yml      # Development setup
├── DEPLOYMENT.md               # Full deployment guide
├── Makefile                    # Command shortcuts
└── start.sh                    # Quick start script
```

## 🛠️ Common Commands

```bash
# Start development
make dev

# Start production
make prod

# View all logs
make logs

# View backend logs only
make backend-logs

# Access MongoDB shell
make mongo-shell

# Stop services
make stop

# Clean everything
make clean

# Test API
make test-api
```

## 🔒 Security Checklist

Before deploying to production:

- [ ] Change `MONGO_ROOT_PASSWORD` in `.env`
- [ ] Update `VITE_API_URL` to your production backend URL
- [ ] Update `FRONTEND_URL` in backend `.env`
- [ ] Enable HTTPS on Coolify
- [ ] Review CORS settings in `backend/src/index.js`
- [ ] Set `NODE_ENV=production`
- [ ] Keep dependencies updated

## 📚 Next Steps

1. **Customize the API**: Edit `backend/src/models/` and `backend/src/controllers/`
2. **Update Frontend**: Use the API client in `src/lib/api.ts`
3. **Add Authentication**: Implement JWT auth in backend
4. **Add More Features**: Follow patterns in existing code
5. **Deploy**: Push to Git and deploy via Coolify

## 🐛 Troubleshooting

**MongoDB connection fails?**
- Wait 40 seconds for MongoDB health check
- Check credentials in `.env`

**Frontend can't reach backend?**
- Verify `VITE_API_URL` in `.env`
- Check CORS settings

**Port already in use?**
- Change ports in `.env`
- Or stop conflicting services

See `DEPLOYMENT.md` for more troubleshooting tips.

## 📖 Documentation

- **Full Deployment Guide**: `DEPLOYMENT.md`
- **Backend API Docs**: `backend/README.md`
- **Environment Setup**: `.env.example`

## 🎯 Example Features Included

- ✅ Full CRUD operations on Items
- ✅ Pagination support
- ✅ Status filtering
- ✅ Input validation
- ✅ Error handling
- ✅ Health checks
- ✅ CORS configured
- ✅ Rate limiting
- ✅ Security headers
- ✅ Hot reload in development
- ✅ Optimized production builds

## 💡 Tips

- Use **development mode** (`docker-compose.dev.yml`) for local work with hot reload
- Use **production mode** (`docker-compose.yml`) for deployment
- Check logs with `docker-compose logs -f` if something goes wrong
- MongoDB data persists in Docker volumes even after restart

## 🤝 Need Help?

- Check `DEPLOYMENT.md` for detailed guides
- View logs: `make logs`
- Test health: `curl http://localhost:3000/health`
- Access MongoDB: `make mongo-shell`

---

**🎉 Happy Coding! Your full-stack template is ready to use!**
