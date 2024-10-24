
// const videoSchema = require('../db/model/video_Model');
// const dotenv = require('dotenv');
// dotenv.config();
// const { success_function, error_function } = require('../utils/response-Handler');

// exports.addVideo = async function(req,res){
//     const{title,description} = req.body;

//     console.log(title);
// }


const videoSchema = require('../db/model/video_Model');
const dotenv = require('dotenv');
dotenv.config();
const { success_function, error_function } = require('../utils/response-Handler');
const path = require('path');

exports.addVideo = async function(req, res) {
    const { title, description } = req.body;
    const videoFile = req.file;

    // Check if the file was uploaded
    if (!videoFile) {
        return res.status(400).json(error_function('Video file not uploaded.'));
    }

    try {
        // Construct the video URL
        const videoUrl = `/videos/${videoFile.filename}`;
        
        // Save the video data to the database
        const newVideo = new videoSchema({
            title,
            description,
            videoUrl
        });

        await newVideo.save();

        // Respond with success
        res.status(201).json(success_function('Video uploaded successfully', newVideo));
    } catch (err) {
        res.status(500).json(error_function('Failed to upload video', err));
    }
};
