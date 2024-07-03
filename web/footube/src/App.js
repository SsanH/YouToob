import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Watch from './watching_Screen/watchingPage';
import Login from './pages/Login/login.js';
import Register from './pages/Register/Register.js';
import AddNewVideoScreen from './pages/AddNewVideoScreen/AddNewVideoScreen.js';
import Homepage from './pages/Homepage/Homepage.js';
import UserProfile from './pages/UserProfile/UserProfile.js'

const findAllUsers = async () => {
  try {
    const response = await fetch('http://localhost:12345/users/find', {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const users = await response.json();
    return users;
  } catch (error) {
    console.error('Failed to fetch users:', error);
  }
};

const findAllVideos = async () => {
  try {
    const response = await fetch('http://localhost:12345/videos/', {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const videos = await response.json();
    return videos;
  } catch (error) {
    console.error('Failed to fetch videos:', error);
  }
};


function App() {
  const [loggedUser, setLoggedUser] = useState();
  const [videoSerialNumber, setVideoSerialNumber] = useState(0);
  const [users, setUsers] = useState([]);
  const [videos, setVideos] = useState([]);

  console.log(loggedUser);

  useEffect(() => {
    console.log("user function called");
    const users = async () => {
      const users = await findAllUsers();
      console.log(users);
      setUsers(users);
    };
    
    users();
  }, []);

  useEffect(() => {
    console.log("videos function called");

    const videos = async () => {
      const videos = await findAllVideos();
      const videoslen = videos.length;
      setVideoSerialNumber(videoslen + 1)
      setVideos(videos);
    };
    videos();
  }, []);

  console.log(videos);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage loggedUser={loggedUser} setLoggedUser={setLoggedUser} currentVideos={videos} setCurrentVideos={setVideos} />} />
        <Route path="/profile" element={<UserProfile loggedUser={loggedUser} setVideos={setVideos} />} />
        <Route path="/login" element={<Login users={users} loggedUser={loggedUser} setLoggedUser={setLoggedUser} />} />
        <Route path='/register' element={<Register users={users} setUsers={setUsers}></Register>}  />
        <Route path='/addNewVideoScreen' element={<AddNewVideoScreen loggedUser={loggedUser} videos={videos} setVideos={setVideos} videoSerialNumber={videoSerialNumber} setVideoSerialNumber={setVideoSerialNumber} />} />
        <Route path='/watch/:vid_id' element={<Watch setCurrentVideos={setVideos} videoDataList={videos} userDataList={users} loggedUser={loggedUser} setLoggedUser={setLoggedUser} />} />
      </Routes>
    </div>
  );
}

export default App;
