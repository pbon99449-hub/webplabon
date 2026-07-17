import mongoose from 'mongoose';

export async function connectMongo() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    // eslint-disable-next-line no-console
    console.error('[mongo] Missing MONGODB_URI in environment');
    process.exit(1);
  }

  mongoose.set('strictQuery', true);

  try {
    await mongoose.connect(uri, {
      autoIndex: process.env.NODE_ENV !== 'production',
    });
    // eslint-disable-next-line no-console
    console.log('[mongo] Connected');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[mongo] Connection error', err);
    process.exit(1);
  }
}

