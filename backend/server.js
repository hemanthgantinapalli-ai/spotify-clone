import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import connectCloudinary from './config/cloudinary.js';
import songRouter from './routes/songRoute.js';
import albumRouter from './routes/albumRoute.js';
import authRouter from './routes/authRoute.js';

// Initialize Environment Configurations
dotenv.config();

// Connect Data Pipeline Repositories
connectDB();
connectCloudinary();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware Stack Configuration
app.use(express.json());

// CORS Configuration — allow your Vercel/frontend deployments
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map((origin) => origin.trim())
  : [
      'https://spotify-clone-gray-iota.vercel.app',
      'https://spotify-clone-2vi373h6h-hemanth-01.vercel.app',
      'https://spotify-clone-2onf.onrender.com',
      'http://localhost:5173',
      'http://localhost:3000'
    ];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`Origin ${origin} not allowed by CORS`));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Allow Chrome Private Network Access (PNA) preflight checks
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Private-Network', 'true');

  // Handle OPTIONS preflight here directly
  if (req.method === 'OPTIONS') {
    if (req.headers['access-control-request-private-network'] === 'true') {
      res.setHeader('Access-Control-Allow-Private-Network', 'true');
    }
    return res.sendStatus(204);
  }

  next();
});

// Core API Route Mount Engines
app.use('/api/auth', authRouter);
app.use('/api/song', songRouter);
app.use('/api/album', albumRouter);

// Base Endpoint Verification Route
app.get('/', (req, res) => {
  res.send('Sound Wave Backend API is running smoothly...');
});

// Boot the Server Listening Instance
app.listen(PORT, () => {
  console.log(`Server is blasting music on port ${PORT}`);
});