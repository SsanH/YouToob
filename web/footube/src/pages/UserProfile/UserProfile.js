import React, { useState, useEffect } from 'react';
import './UserProfile.css';
import SearchBar from '../Homepage/searchBar/SearchBar';
import SideBar from "../Homepage/sideBar/SideBar";
import VideoItem from "../Homepage/videoItem/VideoItem";
import {useNavigate} from 'react-router-dom';

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

const removeVideo = async (videoId) => {
    try {
        const response = await fetch(`http://localhost:12345/videos/${videoId}`, {
            method: 'DELETE',  // Correct HTTP method for deletion
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const videos = await response.json();
        return 200;
    } catch (error) {
        console.error('Failed to fetch videos:', error);
        return 0;
    }
};



function UserProfile({ loggedUser, setVideos }) {
    const navigate = useNavigate();

    const [currentVideos, setCurrentVideos] = useState([]);

    useEffect(() => {
        console.log("videos function called");

        const fetchVideos = async () => {
            const videos = await findAllVideos();
            setCurrentVideos(videos);
        };
        fetchVideos();
    }, []);


    function handleSearch() {
        let searchInput = document.getElementById('search_bar_UserProfile').value;
        sessionStorage.setItem('currentSessionSearch', searchInput);
    }

    function searchFunction(event) {
        event.preventDefault();
        let lastInput = sessionStorage.getItem('currentSessionSearch')
        if (lastInput == null) {
            return;
        }
        const filteredVideos = currentVideos.filter(video => video.title.toLowerCase().includes(lastInput.toLowerCase()))
        if (!filteredVideos){
            return;
        }
        const videoId = filteredVideos[0].id;
        const flag = removeVideo(videoId);
        if (flag == 200){
            const vids = currentVideos.filter(video => String(video.id) !== String(videoId));
            setVideos(vids);
            navigate('/');
        }
    }


    var userVideos;
    if (!userVideos){
        userVideos = currentVideos.filter(video => loggedUser.userId === video.user_id);
    }


    return (
        <div className="bodyUserProfile">
            <SearchBar setCurrentVideos={setCurrentVideos} loggedUser={loggedUser} />

            <div className="mainBodyUserProfile">
                <SideBar />

                <div className="videosUserProfile">
                    <h1>Your Profile</h1>
                    <div className="videos__containerUserProfile">
                        {/* User Profile Info Section */}
                        <div className="userProfileInfo_UserProfile">
                            <p><strong>Username:</strong> {loggedUser.userName}</p>
                            <p><strong>Display Name:</strong> {loggedUser.displayName}</p>
                        </div>

                        {/* Videos Section */}
                        <div className="userVideos_UserProfile">
                        <form action="">
                            Choose video name to remove: 
                            <input id="search_bar_UserProfile" type="text" placeholder="Video name" onChange={handleSearch} />
                            <button onClick={searchFunction}><i className="material-icons">search</i></button>
                        </form>
                            <h1>User Videos</h1> {/* Optional header if you want to label the section */}
                            {userVideos.length > 0 ? (
                                userVideos.map((video, index) => (
                                    <VideoItem key={index} {...video} />
                                ))
                            ) : (
                                <p>No videos found.</p> // Display a message if there are no videos
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default UserProfile;
