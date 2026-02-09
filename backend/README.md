# Backend API - Node.js + Express + MongoDB

RESTful API server built with Node.js, Express, and MongoDB.

## 🚀 Features

- ✅ Express.js web framework
- ✅ MongoDB with Mongoose ODM
- ✅ CRUD operations example
- ✅ Input validation
- ✅ Error handling
- ✅ CORS enabled
- ✅ Security headers (Helmet)
- ✅ Rate limiting
- ✅ Response compression
- ✅ Health check endpoint
- ✅ Docker support

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js      # MongoDB connection
│   ├── models/
│   │   └── Item.js          # Mongoose models
│   ├── controllers/
│   │   └── itemController.js # Business logic
│   ├── routes/
│   │   └── itemRoutes.js    # API routes
│   └── index.js             # Server entry point
├── Dockerfile               # Production image
├── Dockerfile.dev           # Development image
├── .env.example            # Environment template
└── package.json
```

## 🏃 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start development server (with hot reload)
npm run dev

# Start production server
npm start
```

### With Docker

```bash
# Development mode
docker-compose -f ../docker-compose.dev.yml up backend

# Production mode
docker-compose -f ../docker-compose.yml up backend
```

## 🔧 Environment Variables

Create `.env` file:

```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://admin:password@localhost:27017/app_db?authSource=admin
FRONTEND_URL=http://localhost:5173
```

## 📡 API Documentation

### Base URL
```
http://localhost:3000
```

### Health Check

**GET** `/health`

Returns server status.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-02-05T10:30:00.000Z",
  "uptime": 3600,
  "environment": "development"
}
```

### Items API

#### Get All Items

**GET** `/api/items`

Query Parameters:
- `page` (optional, default: 1) - Page number
- `limit` (optional, default: 10) - Items per page
- `status` (optional) - Filter by status: active, inactive, pending

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "65abc123...",
      "name": "Item 1",
      "description": "Description here",
      "status": "active",
      "createdAt": "2026-02-05T10:00:00.000Z",
      "updatedAt": "2026-02-05T10:00:00.000Z"
    }
  ],
  "pagination": {
    "total": 25,
    "page": 1,
    "pages": 3
  }
}
```

#### Get Single Item

**GET** `/api/items/:id`

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "65abc123...",
    "name": "Item 1",
    "description": "Description here",
    "status": "active",
    "createdAt": "2026-02-05T10:00:00.000Z",
    "updatedAt": "2026-02-05T10:00:00.000Z"
  }
}
```

#### Create Item

**POST** `/api/items`

**Request Body:**
```json
{
  "name": "New Item",
  "description": "Optional description",
  "status": "active",
  "metadata": {
    "key": "value"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "65abc123...",
    "name": "New Item",
    "description": "Optional description",
    "status": "active",
    "metadata": {
      "key": "value"
    },
    "createdAt": "2026-02-05T10:00:00.000Z",
    "updatedAt": "2026-02-05T10:00:00.000Z"
  },
  "message": "Item created successfully"
}
```

#### Update Item

**PUT** `/api/items/:id`

**Request Body:**
```json
{
  "name": "Updated Name",
  "status": "inactive"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "65abc123...",
    "name": "Updated Name",
    "status": "inactive",
    ...
  },
  "message": "Item updated successfully"
}
```

#### Delete Item

**DELETE** `/api/items/:id`

**Response:**
```json
{
  "success": true,
  "message": "Item deleted successfully"
}
```

### Error Responses

**404 Not Found:**
```json
{
  "success": false,
  "message": "Item not found"
}
```

**400 Bad Request:**
```json
{
  "success": false,
  "message": "Error creating item",
  "error": "Validation error details"
}
```

**500 Server Error:**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## 🧪 Testing with cURL

```bash
# Health check
curl http://localhost:3000/health

# Get all items
curl http://localhost:3000/api/items

# Get items with filters
curl 'http://localhost:3000/api/items?page=1&limit=5&status=active'

# Get single item
curl http://localhost:3000/api/items/ITEM_ID

# Create item
curl -X POST http://localhost:3000/api/items \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Item",
    "description": "Testing API",
    "status": "active"
  }'

# Update item
curl -X PUT http://localhost:3000/api/items/ITEM_ID \
  -H "Content-Type: application/json" \
  -d '{"status": "inactive"}'

# Delete item
curl -X DELETE http://localhost:3000/api/items/ITEM_ID
```

## 🔐 Security Features

- **Helmet.js:** Sets security HTTP headers
- **CORS:** Configurable cross-origin resource sharing
- **Rate Limiting:** 100 requests per 15 minutes per IP
- **Input Validation:** Mongoose schema validation
- **Error Handling:** No stack traces in production

## 📦 Dependencies

### Production
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `cors` - CORS middleware
- `helmet` - Security headers
- `express-rate-limit` - Rate limiting
- `compression` - Response compression
- `dotenv` - Environment variables

### Development
- `nodemon` - Auto-restart on file changes

## 🛠️ Scripts

```json
{
  "start": "node src/index.js",
  "dev": "nodemon src/index.js"
}
```

## 📝 Adding New Endpoints

1. **Create Model** (`src/models/YourModel.js`):
```javascript
import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  field: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('YourModel', schema);
```

2. **Create Controller** (`src/controllers/yourController.js`):
```javascript
import YourModel from '../models/YourModel.js';

export const getAll = async (req, res) => {
  try {
    const items = await YourModel.find();
    res.json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
```

3. **Create Routes** (`src/routes/yourRoutes.js`):
```javascript
import express from 'express';
import { getAll } from '../controllers/yourController.js';

const router = express.Router();
router.get('/', getAll);

export default router;
```

4. **Register Routes** (`src/index.js`):
```javascript
import yourRoutes from './routes/yourRoutes.js';
app.use('/api/your-resource', yourRoutes);
```

## 🐛 Troubleshooting

### MongoDB connection fails
- Check MongoDB is running
- Verify MONGODB_URI in .env
- Ensure MongoDB accepts connections

### Port already in use
```bash
# Find process using port 3000
lsof -ti:3000

# Kill the process
kill -9 $(lsof -ti:3000)
```

### CORS errors
- Check FRONTEND_URL in .env
- Verify CORS configuration in index.js

## 📚 Resources

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)

---

Built with ❤️ using Node.js
