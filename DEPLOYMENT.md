# Full-Stack Deployment Guide

## 🏗️ Architecture Overview

This template provides a complete full-stack solution with:

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│                 │      │                 │      │                 │
│   React Vite    │─────▶│   Node.js API   │─────▶│    MongoDB      │
│   (Frontend)    │      │   (Backend)     │      │   (Database)    │
│                 │      │                 │      │                 │
└─────────────────┘      └─────────────────┘      └─────────────────┘
   Port: 80/5173          Port: 3000              Port: 27017
```

## 📦 Project Structure

```
.
├── src/                     # React frontend source
├── backend/                 # Node.js backend
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── models/         # Mongoose models
│   │   ├── controllers/    # Business logic
│   │   ├── routes/         # API routes
│   │   └── index.js        # Server entry
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml       # Production orchestration
├── docker-compose.dev.yml   # Development with hot reload
└── .env.example            # Environment template
```

## 🚀 Quick Start

### Development Mode (with hot reload)

1. **Setup environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

2. **Start all services:**
   ```bash
   docker-compose -f docker-compose.dev.yml up --build
   ```

3. **Access services:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000
   - Backend Health: http://localhost:3000/health
   - MongoDB: mongodb://localhost:27017

### Production Mode

```bash
docker-compose up --build -d
```

Access:
- Frontend: http://localhost:80
- Backend API: http://localhost:3000

## 🔧 Environment Configuration

### Root `.env` file:

```env
# MongoDB Configuration
MONGO_ROOT_USERNAME=admin
MONGO_ROOT_PASSWORD=your_secure_password_here
MONGO_DATABASE=app_db
MONGO_PORT=27017

# Backend Configuration
BACKEND_PORT=3000

# Frontend Configuration
FRONTEND_PORT=80
FRONTEND_URL=http://localhost:80
VITE_API_URL=http://localhost:3000
```

## 📡 API Endpoints

### Health Check
```
GET /health
```
Returns server status and uptime.

### Items API (CRUD Example)

```
GET    /api/items          # List all items (paginated)
GET    /api/items/:id      # Get single item
POST   /api/items          # Create new item
PUT    /api/items/:id      # Update item
DELETE /api/items/:id      # Delete item
```

### Example Usage:

```bash
# Create an item
curl -X POST http://localhost:3000/api/items \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Sample Item",
    "description": "This is a test",
    "status": "active"
  }'

# Get all items with pagination
curl 'http://localhost:3000/api/items?page=1&limit=10'

# Get items by status
curl 'http://localhost:3000/api/items?status=active'

# Update item
curl -X PUT http://localhost:3000/api/items/ITEM_ID \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Name",
    "status": "inactive"
  }'

# Delete item
curl -X DELETE http://localhost:3000/api/items/ITEM_ID
```

## 🌐 Deploying to Coolify

### Method 1: Docker Compose (Recommended)

1. **Push code to Git repository**

2. **In Coolify:**
   - Create new service → Docker Compose
   - Connect your repository
   - Coolify auto-detects `docker-compose.yml`

3. **Set environment variables:**
   ```
   MONGO_ROOT_USERNAME=admin
   MONGO_ROOT_PASSWORD=<strong-password>
   MONGO_DATABASE=app_db
   BACKEND_PORT=3000
   FRONTEND_PORT=80
   VITE_API_URL=https://api.yourdomain.com
   FRONTEND_URL=https://yourdomain.com
   ```

4. **Deploy** - Coolify builds and runs all services

### Method 2: Separate Services

#### 1. Deploy MongoDB
- Create Database service
- Select MongoDB 7.0
- Save connection details

#### 2. Deploy Backend
- Create Application
- Source: `backend/` directory
- Dockerfile: `backend/Dockerfile`
- Environment variables:
  ```
  NODE_ENV=production
  PORT=3000
  MONGODB_URI=<from-step-1>
  FRONTEND_URL=<frontend-domain>
  ```

#### 3. Deploy Frontend
- Create Application
- Source: root directory
- Dockerfile: `Dockerfile`
- Build args:
  ```
  BASE_PATH=/
  ```
- Environment:
  ```
  VITE_API_URL=<backend-domain>
  ```

## 🐳 Docker Commands

### View logs:
```bash
docker-compose logs -f
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mongodb
```

### Rebuild specific service:
```bash
docker-compose build backend
docker-compose up -d backend
```

### Access container shell:
```bash
docker-compose exec backend sh
docker-compose exec mongodb mongosh -u admin -p password
```

### Stop and clean:
```bash
docker-compose down
docker-compose down -v  # Remove volumes too
```

## 🛠️ Local Development (without Docker)

### Backend:
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with MongoDB connection
npm run dev
```

### Frontend:
```bash
npm install
npm run dev
```

### MongoDB:
Install locally or use MongoDB Atlas cloud service.

## 📝 Adding Features

### New API Endpoint:

1. Create model: `backend/src/models/YourModel.js`
   ```javascript
   import mongoose from 'mongoose';
   
   const schema = new mongoose.Schema({
     field: { type: String, required: true }
   }, { timestamps: true });
   
   export default mongoose.model('YourModel', schema);
   ```

2. Create controller: `backend/src/controllers/yourController.js`
   ```javascript
   import YourModel from '../models/YourModel.js';
   
   export const getAll = async (req, res) => {
     const items = await YourModel.find();
     res.json({ success: true, data: items });
   };
   ```

3. Create routes: `backend/src/routes/yourRoutes.js`
   ```javascript
   import express from 'express';
   import { getAll } from '../controllers/yourController.js';
   
   const router = express.Router();
   router.get('/', getAll);
   
   export default router;
   ```

4. Register in `backend/src/index.js`:
   ```javascript
   import yourRoutes from './routes/yourRoutes.js';
   app.use('/api/your-resource', yourRoutes);
   ```

## 🔒 Security Checklist

- ✅ Change MongoDB default credentials
- ✅ Use environment variables for secrets
- ✅ Enable HTTPS in production
- ✅ Set NODE_ENV=production
- ✅ Configure CORS properly
- ✅ Keep dependencies updated
- ✅ Use rate limiting (configured)
- ✅ Helmet.js enabled
- ✅ Input validation on API

## 🐛 Troubleshooting

### MongoDB connection fails:
```bash
# Check MongoDB is running
docker-compose ps

# View MongoDB logs
docker-compose logs mongodb

# Verify credentials match .env file
```

### Backend can't connect to MongoDB:
- Wait for MongoDB health check (40s startup)
- Check MONGODB_URI format
- Ensure network connectivity

### Frontend can't reach backend:
- Verify VITE_API_URL in .env
- Check CORS settings in backend
- Test backend: `curl http://localhost:3000/health`

### Port conflicts:
- Change ports in .env
- Or stop conflicting services: `lsof -ti:3000 | xargs kill`

### Hot reload not working:
- Rebuild: `docker-compose -f docker-compose.dev.yml up --build`
- Check volume mounts in docker-compose.dev.yml

## 📚 Tech Stack

- **Frontend:** React 18, Vite, TypeScript, Tailwind CSS
- **Backend:** Node.js 20, Express 4, Mongoose 8
- **Database:** MongoDB 7.0
- **Containerization:** Docker, Docker Compose
- **Deployment:** Coolify, Docker
- **Security:** Helmet, CORS, Rate Limiting, Compression

## 📈 Performance Tips

1. **Database Indexes:** Already configured in models
2. **Compression:** Enabled via compression middleware
3. **Rate Limiting:** Prevents abuse (100 req/15min)
4. **Connection Pooling:** Mongoose handles automatically
5. **Production Build:** Use docker-compose.yml (not dev)

## 🤝 Need Help?

- Check logs: `docker-compose logs -f`
- Backend health: http://localhost:3000/health
- MongoDB shell: `docker-compose exec mongodb mongosh`
- Test API: Use Postman or curl examples above

---

**Happy Coding! 🚀**
