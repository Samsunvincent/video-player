


function uploadVideo(event) {
    event.preventDefault();

    let title = document.getElementById('title').value;
    let video = document.getElementById('video');
    let description = document.getElementById('description').value;

    const videoFile = video.files[0];

    if (videoFile) {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('video', videoFile);
        formData.append('description', description);

        console.log("FormData", formData);

        fetch('/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log("Response from server", data);
        })
        .catch(error => {
            console.log("Error while uploading the video", error);
        });
    }
}

async function showVideo(){
    

    try {
        let response = await fetch('/showVideo',{
            method : 'GET',
            
        }
        );
        console.log("response",response);

        let parsed_Response = await response.json();
        console.log("parsed_response",parsed_Response);

        let data = parsed_Response.data;
        console.log("data",data);

        let videoContainer = document.getElementById('videoContainer')

        let video = ''

        for(i=0; i<data.length; i++){
            video+=`
            <div>${data[i].title}</div>
            <video src="${data[i].videoUrl}" controls></video>

            `
        }

        videoContainer.innerHTML = video;
        
    } catch (error) {
        console.log("error",error)
    }
}