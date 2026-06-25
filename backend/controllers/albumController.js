import { v2 as cloudinary } from 'cloudinary';
import albumModel from '../models/albumModel.js';

// @desc    Create a new album with a banner image upload
// @route   POST /api/album/add
const addAlbum = async (req, res) => {
    try {
        const { name, desc, bgColor } = req.body;
        const imageFile = req.file; // Multer parses a single file as req.file

        if (!imageFile) {
            return res.status(400).json({ success: false, message: 'Album artwork image is required' });
        }

        // Upload album art to Cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });

        const albumData = new albumModel({
            name,
            desc,
            bgColor,
            image: imageUpload.secure_url
        });

        await albumData.save();
        res.status(201).json({ success: true, message: 'Album created successfully!', album: albumData });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error creating album', error: error.message });
    }
};

// @desc    Get all albums
// @route   GET /api/album/list
const listAlbums = async (req, res) => {
    try {
        const allAlbums = await albumModel.find({});
        res.status(200).json({ success: true, albums: allAlbums });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Remove an album
// @route   POST /api/album/remove
const removeAlbum = async (req, res) => {
    try {
        await albumModel.findByIdAndDelete(req.body.id);
        res.status(200).json({ success: true, message: "Album removed successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export { addAlbum, listAlbums, removeAlbum };