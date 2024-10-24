
const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const videosDir = path.join(__dirname, 'public', 'videos');

if (!fs.existsSync(videosDir)) {
    fs.mkdirSync(videosDir, { recursive: true }); 
    console.log('Created directory:', videosDir);
}


const mongoConnect = require('./db/connect'); 
mongoConnect();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('client')); 


const videoRoutes = require('./Router/video-Router'); 
app.use( videoRoutes); 


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
