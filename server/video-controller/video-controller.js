

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

exports.showVideo = async function(req,res){
   try {
    let video_Data = await videoSchema.find();
    console.log("video_Data",video_Data);

    let response = success_function({
        success : true,
        statusCode : 200,
        message : "success",
        data : video_Data,
    });
    res.status(response.statusCode).send(response);
    return;
   } catch (error) {
        console.log("error",error)

        let response = error_function({
            success : false,
            statusCode : 400,
            message : "Something went wrong"
        });
        res.status(response.statusCode).send(resopnse);
        return;
   }
}
