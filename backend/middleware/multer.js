import multer from 'multer';

// Temporary disk storage configuration
const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

export default upload;