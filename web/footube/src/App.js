import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Watch from './watching_Screen/watchingPage';
import vidData from './data/vid.json';
//import userDataList from './data/user.json';
import Login from './pages/Login/login.js';
import Register from './pages/Register/Register.js';
import AddNewVideoScreen from './pages/AddNewVideoScreen/AddNewVideoScreen.js';
import Homepage from './pages/Homepage/Homepage.js';

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

function App() {
  const [loggedUser, setLoggedUser] = useState();
  const [videoSerialNumber, setVideoSerialNumber] = useState(11);
  const [users, setUsers] = useState([]);
  const [videos, setVideos] = useState(vidData);

  useEffect(() => {
    const users = async () => {
      const users = await findAllUsers();
      setUsers(users);
    };
    users();
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage loggedUser={loggedUser} setLoggedUser={setLoggedUser} currentVideos={videos} setCurrentVideos={setVideos} />} />
        <Route path="/login" element={<Login users={users} loggedUser={loggedUser} setLoggedUser={setLoggedUser} />} />
        <Route path='/register' element={<Register users={users} setUsers={setUsers}></Register>}  />
        <Route path='/addNewVideoScreen' element={<AddNewVideoScreen loggedUser={loggedUser} videos={videos} setVideos={setVideos} videoSerialNumber={videoSerialNumber} setVideoSerialNumber={setVideoSerialNumber} />} />
        <Route path='/watch/:vid_id' element={<Watch setCurrentVideos={setVideos} videoDataList={videos} userDataList={users} loggedUser={loggedUser} setLoggedUser={setLoggedUser} />} />
      </Routes>
    </div>
  );
}

export default App;
