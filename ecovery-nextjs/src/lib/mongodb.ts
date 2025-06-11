import mongoose from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/ecovery';

if (!MONGODB_URL) {
  throw new Error('Пожалуйста, укажите MONGODB_URL в переменных окружения');
}

/**
 * Global используется для предотвращения множественных подключений
 * в режиме разработки из-за hot reloading
 */
let cached: any = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URL, opts).then((mongooseInstance) => {
      console.log('✅ MongoDB подключен успешно');
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('❌ Ошибка подключения к MongoDB:', e);
    throw e;
  }

  return cached.conn;
}

export default connectDB; 