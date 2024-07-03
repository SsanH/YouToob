
import React from "react";
import './AddNewVideoScreen.css';
import { Link, useNavigate } from 'react-router-dom';


// async function addNewVideo(uploadedVideo) {
//   console.log(uploadedVideo)
//   const response = await fetch('http://localhost:12345/videos/', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify( uploadedVideo )
//   });

//   if (response.ok) {
//     const newVideo = await response.json();
//     console.log('new video added:', newVideo);
//   } else {
//     console.error('Failed to add user', await response.json());
//   }
// }

async function addIdToUser(uploadVideo) {
  console.log("ADD IT TO USER FUNCTION STARTED");
  console.log(uploadVideo);
  const sendData = { id: uploadVideo.id, user_id: uploadVideo.user_id }
  console.log(sendData);
  const response2 = await fetch('http://localhost:12345/users/addId', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(sendData)
  });

  if (response2.ok) {
    const newVideo = await response2.json();
    console.log('New video added:', newVideo);
    return newVideo;  // Resolve the promise with the new video
  } else {
    const error = await response2.json();
    console.error('Failed to add video', error);
    throw new Error('Failed to add video');  // Reject the promise

  }
}


async function addNewVideo(uploadVideo) {
  const formData = new FormData();
  formData.append('id', uploadVideo.id);
  formData.append('title', uploadVideo.title);
  formData.append('artist', uploadVideo.artist);
  formData.append('publication_date', uploadVideo.publication_date);
  formData.append('details', uploadVideo.details);
  formData.append('likes', uploadVideo.likes);
  formData.append('user_id', uploadVideo.user_id);
  formData.append('img', uploadVideo.img); // Assuming img is a base64 string or URL
  formData.append('video_src', uploadVideo.video_src); // This is the File object
  console.log(uploadVideo);
  const response = await fetch('http://localhost:12345/videos/', {
    method: 'POST',
    body: formData // Send formData instead of JSON
  });


  if (response.ok) {
    const newVideo = await response.json();
    console.log('New video added:', newVideo);
    return newVideo;  // Resolve the promise with the new video
  } else {
    const error = await response.json();
    console.error('Failed to add video', error);
    throw new Error('Failed to add video');  // Reject the promise
  }
}


function AddNewVideoScreen({ loggedUser, videos, setVideos, videoSerialNumber, setVideoSerialNumber }) {
  const navigate = useNavigate();

  const handleUpload = (event) => {
    event.preventDefault();
    const videoTitle = document.getElementById('videoTitle').value;
    const videoDescription = document.getElementById('videoDescription').value;
    const videoSrc = document.getElementById('videoSrc').files[0]; // Assuming this is a video file, handle accordingly if necessary
    const imgFile = document.getElementById('imgSrc').files[0];


    if (!imgFile) {
      console.error("No image selected");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result; // This is your Base64 encoded image string

      if (!loggedUser) {
        console.error("No logged user found");
        return;
      }

      const uploadVideo = {
        id: videoSerialNumber,
        img: base64Image, // Now img contains the Base64 string
        video_src: videoSrc, // You'll need to handle this similarly if it's also supposed to be sent as a file or converted
        title: videoTitle,
        artist: loggedUser.userName,
        publication_date: new Date().toISOString(),
        views: 0,
        details: videoDescription,
        likes: 0,
        user_id: loggedUser.userId
      };

      console.log(loggedUser.id);

      if (!loggedUser) {
        console.error("WEIRD USER BUG");
        return;
      }

      console.log(uploadVideo);

      // console.log(uploadVideo);
      setVideoSerialNumber(videoSerialNumber + 1);
      setVideos([...videos, uploadVideo]);
      addNewVideo(uploadVideo);
      addIdToUser(uploadVideo);
      navigate('/');
    };
    reader.readAsDataURL(imgFile);
    // navigate('/');
  }

  return (
    <div>
      <Link to='/' className="cr-acc btn btn-info login-page-btn">Home Page</Link>
      <div className="title">Upload Video</div>
      <div className="vid-tit">Video Title</div>
      <textarea id="videoTitle" className="vid-tit-input" placeholder="Type here..." />
      <div className="vid-dis-tit">Video Description</div>
      <textarea id="videoDescription" className="vid-dis-input" placeholder="Type here..." />

      <div className="col-sm-10">
        <label htmlFor="imgSrc" className="form-label label-class">Upload Video Image</label>
        <input id="imgSrc" type="file" className="form-control vid-upl" accept="image/*" />
      </div>

      <div className="col-sm-10">
        <label htmlFor="videoSrc" className="form-label label-class">Upload Video</label>
        <input id="videoSrc" type="file" className="form-control vid-upl" accept="video/*" />
      </div>

      <div>
        <button onClick={(event) => handleUpload(event)} className="cr-acc btn btn-info upload-video-btn">Upload Video</button>
      </div>
    </div>
  );
}

export default AddNewVideoScreen;