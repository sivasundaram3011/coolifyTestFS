# Database Module

Standalone, scalable database module for MongoDB with Mongoose.

## 📦 Features

- ✅ Centralized connection management
- ✅ Reusable schemas and models
- ✅ Query helpers and utilities
- ✅ Validation utilities
- ✅ Migration system
- ✅ Seeder system
- ✅ Pagination support
- ✅ Soft delete support
- ✅ Type-safe operations

## 📁 Structure

```
database/
├── connection.js          # Connection manager
├── index.js              # Main exports
├── package.json          # Database dependencies
├── models/               # Mongoose models
│   └── Item.js
├── schemas/              # Reusable schemas
│   └── itemSchema.js
├── migrations/           # Database migrations
│   ├── 001_create_items.js
│   └── runner.js
├── seeders/              # Data seeders
│   ├── itemSeeder.js
│   └── runner.js
└── utils/                # Helper utilities
    ├── queryHelpers.js
    └── validation.js
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd database
npm install
```

### 2. Connect to Database

```javascript
import { connect } from '../database/index.js';

// Connect with default URI from env
await connect();

// Or with custom URI
await connect('mongodb://localhost:27017/mydb');
```

### 3. Use Models

```javascript
import { Item } from '../database/index.js';

// Create
const item = await Item.create({
  name: 'New Item',
  status: 'active'
});

// Find
const items = await Item.find({ status: 'active' });

// Update
await Item.findByIdAndUpdate(id, { name: 'Updated' });

// Delete
await Item.findByIdAndDelete(id);
```

## 📚 API Reference

### Connection Management

```javascript
import { connect, disconnect, isConnectionActive } from '../database/index.js';

// Connect to MongoDB
await connect(uri, options);

// Disconnect
await disconnect();

// Check connection status
const isActive = isConnectionActive(); // boolean

// Get connection instance
import { getConnection } from '../database/index.js';
const conn = getConnection();
```

### Models

#### Item Model

```javascript
import { Item } from '../database/index.js';

// Schema fields
{
  name: String,           // Required, max 100 chars
  description: String,    // Optional, max 500 chars
  status: String,         // 'active' | 'inactive' | 'pending'
  metadata: Map,          // Key-value pairs
  tags: [String],         // Array of tags
  priority: Number,       // 0-10
  isDeleted: Boolean,     // Soft delete flag
  createdAt: Date,        // Auto-generated
  updatedAt: Date         // Auto-generated
}

// Instance methods
await item.activate();      // Set status to active
await item.deactivate();    // Set status to inactive
await item.softDelete();    // Soft delete item

// Static methods
const activeItems = await Item.findActive();
const taggedItems = await Item.findByTag('urgent');

// Virtual properties
item.isActive  // true if status === 'active'
```

### Query Helpers

```javascript
import { paginate, bulkCreate, exists, upsert } from '../database/index.js';

// Pagination
const result = await paginate(Item, { status: 'active' }, {
  page: 1,
  limit: 10,
  sort: { createdAt: -1 },
  select: 'name status',
  populate: 'author'
});
// Returns: { data: [...], pagination: { total, page, pages, hasNext, hasPrev } }

// Bulk create
const result = await bulkCreate(Item, [
  { name: 'Item 1' },
  { name: 'Item 2' }
]);
// Returns: { success, inserted, data } or { success, inserted, failed, errors }

// Check existence
const itemExists = await exists(Item, { name: 'Test' });

// Upsert
const item = await upsert(
  Item,
  { name: 'Unique Item' },
  { name: 'Unique Item', status: 'active' }
);

// Soft delete
await softDelete(Item, { status: 'old' });

// Restore soft deleted
await restore(Item, { _id: itemId });
```

### Validation Utilities

```javascript
import { 
  isValidObjectId, 
  validateRequiredFields,
  sanitizeData,
  isValidEmail,
  validateDateRange
} from '../database/index.js';

// Validate ObjectId
isValidObjectId('507f1f77bcf86cd799439011'); // true

// Validate required fields
const result = validateRequiredFields(data, ['name', 'email']);
// Returns: { isValid, missingFields, message }

// Sanitize data (remove undefined values)
const clean = sanitizeData({ name: 'Test', desc: undefined });
// Returns: { name: 'Test' }

// Validate email
isValidEmail('user@example.com'); // true

// Validate date range
const result = validateDateRange('2026-01-01', '2026-12-31');
// Returns: { isValid, message }
```

## 🔄 Migrations

Migrations help manage database schema changes over time.

### Run Migrations

```bash
# Run all migrations
npm run migrate

# Rollback migrations
npm run migrate:down
```

### Create Migration

Create a new file in `migrations/` directory:

```javascript
// migrations/002_add_user_model.js
import User from '../models/User.js';

export const up = async () => {
  console.log('Creating user collection...');
  await User.createIndexes();
  return { success: true };
};

export const down = async () => {
  console.log('Dropping user collection...');
  await User.collection.drop();
  return { success: true };
};

export default { up, down };
```

## 🌱 Seeders

Seeders populate your database with initial or test data.

### Run Seeders

```bash
npm run seed
```

### Create Seeder

Create a new file in `seeders/` directory:

```javascript
// seeders/userSeeder.js
import User from '../models/User.js';

export const seed = async () => {
  const users = [
    { name: 'Admin', email: 'admin@example.com' },
    { name: 'User', email: 'user@example.com' }
  ];
  
  await User.deleteMany({}); // Optional: clear existing
  const result = await User.insertMany(users);
  console.log(`✅ Inserted ${result.length} users`);
  
  return { success: true, count: result.length };
};

export default seed;
```

## 🎯 Usage Examples

### Example 1: CRUD Operations

```javascript
import { Item } from '../database/index.js';

// Create
const newItem = await Item.create({
  name: 'Important Task',
  description: 'Complete project documentation',
  status: 'pending',
  tags: ['urgent', 'documentation'],
  priority: 9
});

// Read
const item = await Item.findById(newItem._id);
const allItems = await Item.find();
const activeItems = await Item.findActive();

// Update
item.name = 'Updated Task';
await item.save();
// or
await Item.findByIdAndUpdate(id, { status: 'active' });

// Delete (soft)
await item.softDelete();

// Delete (permanent)
await Item.findByIdAndDelete(id);
```

### Example 2: Advanced Queries

```javascript
import { Item, paginate } from '../database/index.js';

// Paginated search
const result = await paginate(
  Item,
  { 
    status: 'active',
    priority: { $gte: 5 }
  },
  {
    page: 1,
    limit: 20,
    sort: { priority: -1, createdAt: -1 }
  }
);

// Complex query
const items = await Item.find({
  $or: [
    { status: 'active' },
    { priority: { $gt: 8 } }
  ],
  tags: { $in: ['urgent', 'important'] }
})
.sort('-createdAt')
.limit(10)
.select('name status priority');

// Aggregation
const stats = await Item.aggregate([
  { $match: { status: 'active' } },
  { $group: {
    _id: '$status',
    count: { $sum: 1 },
    avgPriority: { $avg: '$priority' }
  }}
]);
```

### Example 3: Using in Backend Controllers

```javascript
// backend/src/controllers/itemController.js
import { Item, paginate, isValidObjectId } from '../../../database/index.js';

export const getAllItems = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const query = status ? { status } : {};
    
    const result = await paginate(Item, query, { page, limit });
    
    res.json({
      success: true,
      ...result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getItemById = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid item ID'
      });
    }
    
    const item = await Item.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }
    
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
```

## 🔧 Adding New Models

### 1. Create Schema

```javascript
// database/schemas/userSchema.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

export default userSchema;
```

### 2. Create Model

```javascript
// database/models/User.js
import mongoose from 'mongoose';
import userSchema from '../schemas/userSchema.js';

const User = mongoose.model('User', userSchema);

export default User;
```

### 3. Export from Index

```javascript
// database/index.js
export { default as User } from './models/User.js';
export { default as userSchema } from './schemas/userSchema.js';
```

### 4. Use in Backend

```javascript
import { User } from '../../../database/index.js';

const users = await User.find();
```

## 🔒 Best Practices

1. **Always use the database module** - Don't create direct Mongoose connections in backend
2. **Use schemas for reusability** - Separate schemas from models for testing
3. **Leverage utilities** - Use paginate, validate, etc. instead of writing custom code
4. **Run migrations** - Keep schema changes tracked with migrations
5. **Soft delete** - Use soft delete for important data
6. **Index properly** - Add indexes for frequently queried fields
7. **Validate input** - Use validation utilities before database operations
8. **Handle errors** - Always wrap database calls in try-catch

## 📊 Testing

```javascript
import { connect, disconnect, clearDatabase, Item } from '../database/index.js';

describe('Item Model', () => {
  beforeAll(async () => {
    await connect(process.env.TEST_MONGODB_URI);
  });

  afterAll(async () => {
    await clearDatabase(); // Clear test data
    await disconnect();
  });

  it('should create an item', async () => {
    const item = await Item.create({
      name: 'Test Item',
      status: 'active'
    });
    
    expect(item.name).toBe('Test Item');
    expect(item.isActive).toBe(true);
  });
});
```

## 🐛 Troubleshooting

### Connection Issues

```javascript
// Check connection status
import { isConnectionActive } from '../database/index.js';

if (!isConnectionActive()) {
  console.log('Not connected to database');
}
```

### Import Issues

Make sure to use correct relative paths:
```javascript
// In backend/src/controllers/
import { Item } from '../../../database/index.js';

// In backend/src/routes/
import { Item } from '../../../database/index.js';
```

### Migration Errors

```bash
# Check migration status
cd database
node migrations/runner.js up

# Rollback if needed
node migrations/runner.js down
```

## 📚 Resources

- [Mongoose Documentation](https://mongoosejs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Schema Design Best Practices](https://www.mongodb.com/developer/products/mongodb/mongodb-schema-design-best-practices/)

---

**Built for scalability and maintainability** 🚀
