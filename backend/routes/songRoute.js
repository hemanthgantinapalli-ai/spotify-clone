import express from 'express';
import { addSong, listSongs, removeSong } from '../controllers/songController.js';
import upload from '../middleware/multer.js';

const songRouter = express.Router();

// Configure multi-file upload for fields
const multiUpload = upload.fields([
    { name: 'audioFile', maxCount: 1 },
    { name: 'imageFile', maxCount: 1 }
]);

// Open routes - no auth required for personal app usage
songRouter.post('/add', multiUpload, addSong);
songRouter.get('/list', listSongs);
songRouter.post('/remove', removeSong);

export default songRouter;