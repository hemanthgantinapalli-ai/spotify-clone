import express from 'express';
import { addAlbum, listAlbums, removeAlbum } from '../controllers/albumController.js';
import upload from '../middleware/multer.js';

const albumRouter = express.Router();

// 'image' matches the form data key name we'll send from Postman/Frontend
albumRouter.post('/add', upload.single('image'), addAlbum);
albumRouter.get('/list', listAlbums);
albumRouter.post('/remove', removeAlbum);

export default albumRouter;