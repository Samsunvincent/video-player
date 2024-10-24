

const mongoose = require('mongoose');

let videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    videoUrl: {
        type: String,
        // required: true
    }
});

let Video = mongoose.model('Video', videoSchema);
module.exports = Video;
