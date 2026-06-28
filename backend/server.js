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

// Allow Chrome Private Network Access (PNA) preflight checks
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Private-Network', 'true');
    next();
});

app.use(cors()); // Permitting cross-port communications with React frontend

// Core API Route Mount Engines
app.use('/api/auth', authRouter); // auth routes
app.use('/api/song', songRouter);   // Matches frontend URL: http://localhost:5000/api/song/list
app.use('/api/album', albumRouter); // Matches frontend URL: http://localhost:5000/api/album/list

// Base Endpoint Verification Route
app.get('/', (req, res) => {
    res.send('Sound Wave Backend API is running smoothly...');
});

// Boot the Server Listening Instance
app.listen(PORT, () => {
    console.log(`Server is blasting music on port ${PORT}`);
});