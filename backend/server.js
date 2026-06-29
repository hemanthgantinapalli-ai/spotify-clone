import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import connectDB from './config/db.js';
import connectCloudinary from './config/cloudinary.js';

import songRouter from './routes/songRoute.js';
import albumRouter from './routes/albumRoute.js';
import authRouter from './routes/authRoute.js';

// Load environment variables
dotenv.config();

// Connect to database and Cloudinary
connectDB();
connectCloudinary();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Handle Private Network Access (PNA) preflight requests
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Private-Network', 'true');

  if (req.method === 'OPTIONS') {
    if (
      req.headers['access-control-request-private-network'] === 'true'
    ) {
      res.setHeader('Access-Control-Allow-Private-Network', 'true');
    }

    return res.sendStatus(204);
  }

  next();
});

// Routes
app.use('/api/auth', authRouter);
app.use('/api/song', songRouter);
app.use('/api/album', albumRouter);

// Test route
app.get('/', (req, res) => {
  res.send('Sound Wave Backend API is running smoothly...');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is blasting music on port ${PORT}`);
});