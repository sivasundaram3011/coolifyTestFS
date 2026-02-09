/**
 * Database Module - Main Export
 * Centralized database access for the application
 */

// Connection manager
import {
  connect, 
  disconnect, 
  isConnectionActive, 
  getConnection,
  clearDatabase,
} from './connection.js';

export {
  connect, 
  disconnect, 
  isConnectionActive, 
  getConnection,
  clearDatabase,
};

// Models
export { default as Item } from './models/Item.js';
export { default as User } from './models/User.js';

import ItemModel from './models/Item.js';
import UserModel from './models/User.js';

// Schemas (for extending or testing)
export { default as itemSchema } from './schemas/itemSchema.js';
export { default as userSchema } from './schemas/userSchema.js';

// Utilities
export { 
  paginate,
  bulkCreate,
  textSearch,
  aggregate,
  exists,
  upsert,
  softDelete,
  restore,
} from './utils/queryHelpers.js';

export {
  isValidObjectId,
  validateRequiredFields,
  sanitizeData,
  isValidEmail,
  validateDateRange,
} from './utils/validation.js';

import {
  paginate,
  bulkCreate,
  textSearch,
  aggregate,
  exists,
  upsert,
  softDelete,
  restore,
} from './utils/queryHelpers.js';

import {
  isValidObjectId,
  validateRequiredFields,
  sanitizeData,
  isValidEmail,
  validateDateRange,
} from './utils/validation.js';

// Default export
export default {
  connect,
  disconnect,
  models: {
    Item: ItemModel,
    User: UserModel,
  },
  utils: {
    paginate,
    bulkCreate,
    textSearch,
    aggregate,
    exists,
    upsert,
    softDelete,
    restore,
    isValidObjectId,
    validateRequiredFields,
    sanitizeData,
    isValidEmail,
    validateDateRange,
  },
};