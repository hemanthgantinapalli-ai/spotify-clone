import { v2 as cloudinary } from 'cloudinary';
import songModel from '../models/songModel.js';

// Add a new song
const addSong = async (req, res) => {
    try {
        const { name, desc, album } = req.body;

        // Check if files exist
        if (!req.files || !req.files.audioFile || !req.files.imageFile) {
            return res.status(400).json({ success: false, message: "Missing audio or image file" });
        }

        const audioFile = req.files.audioFile[0];
        const imageFile = req.files.imageFile[0];

        // Upload to Cloudinary
        const audioUpload = await cloudinary.uploader.upload(audioFile.path, { resource_type: 'video' });
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });

        // Format duration (e.g., 205 seconds -> "3:25")
        const durationMinutes = Math.floor(audioUpload.duration / 60);
        const durationSeconds = Math.floor(audioUpload.duration % 60).toString().padStart(2, '0');

        const songData = new songModel({
            name,
            desc,
            album,
            file: audioUpload.secure_url,
            image: imageUpload.secure_url,
            duration: `${durationMinutes}:${durationSeconds}`
        });

        await songData.save();
        res.status(201).json({ success: true, message: 'Song added successfully!', song: songData });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// List all songs
const listSongs = async (req, res) => {
    try {
        const allSongs = await songModel.find({});
        res.status(200).json({ success: true, songs: allSongs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Remove a song
const removeSong = async (req, res) => {
    try {
        await songModel.findByIdAndDelete(req.body.id);
        res.status(200).json({ success: true, message: "Song removed successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export { addSong, listSongs, removeSong };