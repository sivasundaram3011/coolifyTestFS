import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://mongodb:27017/app_db';
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ MongoDB connected successfully');
    console.log(`📊 Database: ${mongoose.connection.name}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB error:', err);
});

export default connectDB;
