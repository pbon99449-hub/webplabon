import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import { connectMongo } from './config/mongo.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandlers.js';

import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';
import wishlistRoutes from './routes/wishlist.routes.js';
import cartRoutes from './routes/cart.routes.js';
import orderRoutes from './routes/order.routes.js';
import adminRoutes from './routes/admin.routes.js';
import { checkPythonServices } from './services/pythonBridge.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Security headers (OWASP baseline)
app.use(helmet());

// CORS - allow frontend to communicate
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
  })
);

// Body parsing
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Cookies
app.use(cookieParser());

// Logging
app.use(morgan('dev'));

// Rate limiting (anti-spam / brute force baseline)
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 500,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

// Health
app.get('/api/health', (req, res) => {
  res.status(200).json({ ok: true, service: 'wearnest-backend' });
});

// Python services health check
app.get('/api/health/services', async (req, res) => {
  try {
    const services = await checkPythonServices();
    res.status(200).json({ ok: true, ...services });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);

// Email test (non-prod helper)
app.get('/api/email/ping', (req, res) => {
  res.json({ ok: true, route: 'email' });
});

// Serve logo from public folder
app.use('/public', express.static(path.join(__dirname, '..', 'public')));

// Fallback
app.use(notFoundHandler);
app.use(errorHandler);

// Connect Mongo once at startup
connectMongo();

export default app;

