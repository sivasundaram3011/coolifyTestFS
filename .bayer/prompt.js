🎨 BAYER DESIGN SYSTEM - FULL-STACK TEMPLATE 🎨

════════════════════════════════════════════════════════════════
🚀 TEMPLATE OVERVIEW
════════════════════════════════════════════════════════════════

This is a FULL-STACK template with:
✅ Frontend: React 18 + Vite + TypeScript
✅ Backend: Node.js + Express REST API
✅ Database: MongoDB with Mongoose
✅ Deployment: Docker Compose + Coolify ready
✅ Design System: Bayer colors (STRICT enforcement)

════════════════════════════════════════════════════════════════
⚠️ CRITICAL: BAYER COLOR ENFORCEMENT ⚠️
════════════════════════════════════════════════════════════════

You MUST use ONLY Bayer Design System colors. NO other colors allowed!

════════════════════════════════════════════════════════════════

COLOR USAGE RULES:

1. ❌ FORBIDDEN - Never use these:
   - Tailwind default colors: bg-blue-500, text-red-600, etc.
   - Hex colors: #ff0000, #3b82f6, etc.
   - RGB colors: rgb(255, 0, 0), etc.
   - Any color not from Bayer Design System

2. ✅ REQUIRED - Use ONLY Bayer classes:

   TEXT COLORS:
   - .lmnt-theme-primary
   - .lmnt-theme-secondary
   - .lmnt-theme-on-primary
   - .lmnt-theme-on-secondary
   - .lmnt-theme-on-surface
   - .lmnt-theme-danger
   - .lmnt-theme-success
   
   BACKGROUND COLORS:
   - .lmnt-theme-primary-bg
   - .lmnt-theme-secondary-bg
   - .lmnt-theme-surface-bg
   - .lmnt-theme-surface-variant-bg
   - .lmnt-theme-danger-bg
   - .lmnt-theme-success-bg

   OR use Tailwind with Bayer colors:
   - bg-bayer-primary-400
   - text-bayer-secondary-700
   - border-bayer-primary-500

3. OPACITY VARIANTS (for disabled/inactive states):
   - .lmnt-theme-on-primary-active (87% opacity)
   - .lmnt-theme-on-primary-inactive (73% opacity)
   - .lmnt-theme-on-primary-disabled (38% opacity)

4. DIVIDERS/BORDERS (12% opacity strokes):
   - .lmnt-theme-divider-primary
   - .lmnt-theme-on-primary-stroke-border

════════════════════════════════════════════════════════════════

EXAMPLE CORRECT USAGE:

```tsx
// ✅ CORRECT
<div className="lmnt-theme-primary-bg lmnt-theme-on-primary">
  <h1 className="lmnt-theme-primary">Bayer Healthcare</h1>
  <p className="lmnt-theme-on-surface">Description text</p>
  <button className="lmnt-theme-secondary-bg lmnt-theme-on-secondary">
    Click Me
  </button>
</div>

// ✅ ALSO CORRECT (Tailwind with Bayer colors)
<div className="bg-bayer-primary-400 text-white">
  <h1 className="text-bayer-secondary-700">Title</h1>
</div>

// ❌ WRONG - DO NOT DO THIS!
<div className="bg-blue-500 text-red-600">  // ❌ Default Tailwind colors
  <h1 style={{color: '#ff0000'}}>Title</h1> // ❌ Hex colors
</div>
```

════════════════════════════════════════════════════════════════

DESIGN GUIDELINES:

For all designs I ask you to make, have them be beautiful, not cookie cutter. Make webpages that are fully featured and worthy for production.

ALLOWED TOOLS - FRONTEND:
- ✅ Tailwind CSS classes (spacing, layout, flexbox, grid, etc.)
- ✅ Bayer Design System color classes (ONLY)
- ✅ React hooks (useState, useEffect, etc.)
- ✅ Lucide React for icons
- ✅ Unsplash for images (link only, don't download)
- ✅ API client in src/lib/api.ts for backend calls

ALLOWED TOOLS - BACKEND:
- ✅ Express.js for REST API
- ✅ Mongoose for MongoDB models
- ✅ Create new routes in backend/src/routes/
- ✅ Create new models in backend/src/models/
- ✅ Create new controllers in backend/src/controllers/

RESTRICTIONS:
- ❌ NO other UI libraries (unless I specifically request)
- ❌ NO custom color values
- ❌ NO Tailwind default color classes

════════════════════════════════════════════════════════════════
🔧 FULL-STACK DEVELOPMENT GUIDE
════════════════════════════════════════════════════════════════

PROJECT STRUCTURE:
/src                    - Frontend (React + Vite + TypeScript)
/backend               - Backend API (Node.js + Express)
/database              - Database Module (Separate & Scalable)
  ├── models/          - Mongoose models
  ├── schemas/         - Reusable schemas
  ├── migrations/      - Database migrations
  ├── seeders/         - Data seeders
  └── utils/           - Query helpers & validation

FRONTEND (React + Vite):
- Location: /src
- API Client: Use src/lib/api.ts for backend calls
- Example: src/components/ItemsList.tsx shows CRUD operations
- Port: 5173 (dev), 80 (prod)

BACKEND (Node.js + Express):
- Location: /backend
- Entry: backend/src/index.js
- Routes: backend/src/routes/
- Controllers: backend/src/controllers/
- Port: 3000
- Import database: import { Model } from '../../../database/index.js';

DATABASE MODULE (Separate & Scalable):
- Location: /database (STANDALONE MODULE)
- Connection: database/connection.js
- Models: database/models/
- Schemas: database/schemas/ (reusable)
- Migrations: database/migrations/ (run with: npm run migrate)
- Seeders: database/seeders/ (run with: npm run seed)
- Utilities:
  * Query helpers: paginate, bulkCreate, exists, upsert, softDelete
  * Validation: isValidObjectId, validateRequiredFields, etc.
- Documentation: database/README.md

ADDING NEW DATABASE MODELS:
1. Create schema in database/schemas/YourSchema.js
2. Create model in database/models/YourModel.js
3. Export from database/index.js
4. Use in backend: import { YourModel } from '../../../database/index.js';

EXAMPLE NEW MODEL:
// database/schemas/userSchema.js
import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
}, { timestamps: true });
export default userSchema;

// database/models/User.js
import mongoose from 'mongoose';
import userSchema from '../schemas/userSchema.js';
export default mongoose.model('User', userSchema);

// database/index.js (add export)
export { default as User } from './models/User.js';
export { default as userSchema } from './schemas/userSchema.js';

ADDING NEW API ENDPOINTS:
1. Import model: import { YourModel, paginate } from '../../../database/index.js';
2. Create controller in backend/src/controllers/yourController.js
3. Create routes in backend/src/routes/yourRoutes.js
4. Register in backend/src/index.js
5. Add to API client in src/lib/api.ts
6. Use in React components

EXAMPLE BACKEND CONTROLLER WITH DATABASE:
// backend/src/controllers/userController.js
import { User, paginate, isValidObjectId } from '../../../database/index.js';

export const getUsers = async (req, res) => {
  try {
    const result = await paginate(User, {}, { page: 1, limit: 10 });
    res.json({ success: true, ...result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserById = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ success: false, message: 'Invalid ID' });
  }
  const user = await User.findById(req.params.id);
  res.json({ success: true, data: user });
};

// backend/src/routes/userRoutes.js
import express from 'express';
import { getUsers, getUserById } from '../controllers/userController.js';
const router = express.Router();
router.get('/', getUsers);
router.get('/:id', getUserById);
export default router;

// backend/src/index.js
import userRoutes from './routes/userRoutes.js';
app.use('/api/users', userRoutes);

// src/lib/api.ts
async getUsers() {
  return this.request<User[]>('/api/users');
}

DATABASE UTILITIES AVAILABLE:
// Query Helpers
import { paginate, bulkCreate, exists, upsert, softDelete, restore } from '../../../database/index.js';

const result = await paginate(Model, query, { page: 1, limit: 10 });
const created = await bulkCreate(Model, [{ name: 'Item 1' }]);
const itemExists = await exists(Model, { name: 'Test' });
await softDelete(Model, { status: 'old' });

// Validation
import { isValidObjectId, validateRequiredFields, sanitizeData } from '../../../database/index.js';

if (!isValidObjectId(id)) return res.status(400).json({ error: 'Invalid ID' });
const validation = validateRequiredFields(data, ['name', 'email']);
const clean = sanitizeData(data);

DATABASE COMMANDS:
cd database && npm run migrate      # Run migrations
cd database && npm run migrate:down # Rollback migrations
cd database && npm run seed         # Seed database

DEVELOPMENT WORKFLOW:
1. Start services: docker-compose -f docker-compose.dev.yml up
2. Frontend hot reloads on changes to /src
3. Backend hot reloads on changes to /backend/src
4. Database module mounted as read-only volume
5. MongoDB persists data in Docker volume

PRODUCTION DEPLOYMENT:
1. Use docker-compose.yml for production
2. Update .env with production values
3. Deploy to Coolify via Docker Compose
4. Database module is copied during Docker build
5. See DEPLOYMENT.md for detailed instructions

════════════════════════════════════════════════════════════════

Remember: Bayer colors ONLY. No exceptions!

