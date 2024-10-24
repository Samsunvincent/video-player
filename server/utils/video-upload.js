


const multer = require('multer');
const path = require('path');
const uuid = require('uuid').v4;

// Destination directory configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'video') {
            const rootdir = path.dirname(require.main.filename);
            cb(null, path.join(rootdir, 'public', 'videos')); // Fix directory path
        }
    },
    filename: (req, file, cb) => {
        const videoExt = file.mimetype.split('/')[1];
        const id = uuid();
        cb(null, 'video_' + id + '.' + videoExt);
    }
});

// File filter to allow only .mp4 videos
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'video/mp4') {
        cb(null, true);
    } else {
        cb(new Error('Only .mp4 files are allowed!'), false);
    }
};

exports.videoUpload = multer({ storage, fileFilter });
