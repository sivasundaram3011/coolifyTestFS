import mongoose from 'mongoose';

/**
 * Database Connection Manager
 * Handles MongoDB connections with reconnection logic
 */

let isConnected = false;

/**
 * Connect to MongoDB
 * @param {string} uri - MongoDB connection URI
 * @param {object} options - Mongoose connection options
 * @returns {Promise<mongoose.Connection>}
 */
export const connect = async (uri, options = {}) => {
  if (isConnected) {
    console.log('✅ Using existing database connection');
    return mongoose.connection;
  }

  const connectionUri = uri || process.env.MONGODB_URI || 'mongodb://mongodb:27017/app_db';
  
  const defaultOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    ...options,
  };

  try {
    await mongoose.connect(connectionUri, defaultOptions);
    isConnected = true;
    
    console.log('✅ MongoDB connected successfully');
    console.log(`📊 Database: ${mongoose.connection.name}`);
    console.log(`🔗 Host: ${mongoose.connection.host}`);
    
    return mongoose.connection;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    throw error;
  }
};

/**
 * Disconnect from MongoDB
 * @returns {Promise<void>}
 */
export const disconnect = async () => {
  if (!isConnected) {
    return;
  }

  try {
    await mongoose.disconnect();
    isConnected = false;
    console.log('👋 MongoDB disconnected successfully');
  } catch (error) {
    console.error('❌ Error disconnecting from MongoDB:', error.message);
    throw error;
  }
};

/**
 * Get current connection status
 * @returns {boolean}
 */
export const isConnectionActive = () => {
  return isConnected && mongoose.connection.readyState === 1;
};

/**
 * Get database connection instance
 * @returns {mongoose.Connection}
 */
export const getConnection = () => {
  return mongoose.connection;
};

/**
 * Clear database (use with caution, for testing only)
 * @returns {Promise<void>}
 */
export const clearDatabase = async () => {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Cannot clear database in production environment');
  }

  const collections = mongoose.connection.collections;
  
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
  
  console.log('🧹 Database cleared');
};

// Connection event listeners
mongoose.connection.on('connected', () => {
  console.log('📡 Mongoose connected to MongoDB');
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ Mongoose disconnected from MongoDB');
  isConnected = false;
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err);
  isConnected = false;
});

// Handle application termination
process.on('SIGINT', async () => {
  await disconnect();
  process.exit(0);
});

export default {
  connect,
  disconnect,
  isConnectionActive,
  getConnection,
  clearDatabase,
};
