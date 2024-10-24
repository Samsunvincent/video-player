// const express = require('express');
// const { videoUpload } = require('../utils/video-upload');
// const router = express.Router();
// const videoController = require('../video-controller/video-controller');

// // Make sure you're referencing the correct function from videoController
// router.post('/upload', videoUpload.single('video'), videoController.addVideo);


// module.exports = router;



const express = require('express');
const { videoUpload } = require('../utils/video-upload');
const router = express.Router();
const videoController = require('../video-controller/video-controller');

// Make sure to use the correct middleware and controller function
router.post('/upload', videoUpload.single('video'), videoController.addVideo);
router.get('/showVideo',videoController.showVideo);
module.exports = router;
