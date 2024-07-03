
import React from "react";
import './AddNewVideoScreen.css';
import { Link, useNavigate } from 'react-router-dom';

function AddNewVideoScreen({ loggedUser, videos, setVideos, videoSerialNumber, setVideoSerialNumber }) {
  const currentDate = new Date();
  const date = currentDate.toISOString().slice(0, 10); // extract the cuurent date
  const navigate = useNavigate();

  const handleUpload = () => {
    const videoTitle = document.getElementById('videoTitle').value;
    const videoDescription = document.getElementById('videoDescription').value;
    const videoSrc = document.getElementById('videoSrc').files[0];
    const imgSrc = document.getElementById('imgSrc').files[0];
    console.log(loggedUser);
    if (!loggedUser) {
      console.error("No logged user found");
      return;
    }

    const uploadVideo = {
      id: videoSerialNumber,
      img: imgSrc ? URL.createObjectURL(imgSrc) : '',
      video_src: videoSrc ? URL.createObjectURL(videoSrc) : '',
      title: videoTitle,
      artist: loggedUser.userName,
      publication_date: date,
      views: 0,
      details: videoDescription,
      likes: 0,
      user_id: loggedUser.id
    };

    setVideoSerialNumber(videoSerialNumber + 1);
    setVideos([...videos, uploadVideo]);
    navigate('/');
    console.log(loggedUser);
    console.log(videos);
  };
  
  return (
    <div>
      <Link to='/' className="cr-acc btn btn-info login-page-btn">Home Page</Link>
      <div className="title">Upload Video</div>
      <div className="vid-tit">Video Title</div>
      <textarea id="videoTitle" className="vid-tit-input" placeholder="Type here..." />
      <div className="vid-dis-tit">Video Description</div>
      <textarea id="videoDescription" className="vid-dis-input" placeholder="Type here..." />
      
      {/* Input for image upload */}
      <div className="col-sm-10">
        <label htmlFor="imgSrc" className="form-label label-class">Upload Video Image</label>
        <input id="imgSrc" type="file" className="form-control vid-upl" accept="image/*" />
      </div>

      {/* Input for video upload */}
      <div className="col-sm-10">
        <label htmlFor="videoSrc" className="form-label label-class">Upload Video</label>
        <input id="videoSrc" type="file" className="form-control vid-upl" accept="video/*" />
      </div>

      <div>
        <button onClick={handleUpload} className="cr-acc btn btn-info upload-video-btn">Upload Video</button>
      </div>
    </div>
  );
}

export default AddNewVideoScreen;
