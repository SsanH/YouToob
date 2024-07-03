import './SearchBar.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


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



function SearchBar({ setCurrentVideos, loggedUser, setLoggedUser }) {
    const navigate = useNavigate();
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const videos = async () => {
            const videos = await findAllVideos();
            setVideos(videos);
        };
        videos();
    }, []);

    function handleSearch() {
        let searchInput = document.getElementById('search_bar_Homepage').value;
        sessionStorage.setItem('currentSessionSearch', searchInput);
    }

    function navigateToMain() {

    }


    function searchFunction(event) {
        event.preventDefault();
        let lastInput = sessionStorage.getItem('currentSessionSearch')
        if (lastInput == null) {
            setCurrentVideos(videos);
            navigate('/');
            return;
        }
        const filteredVideos = videos.filter(video => video.title.toLowerCase().includes(lastInput.toLowerCase()))
        setCurrentVideos(filteredVideos)
        navigate('/');
    }

    function handleLogOut() {
        setLoggedUser(null);
    }


    if (!loggedUser) {
        return (
            <div className="header_Homepage">
                <div className="header__left_Homepage" position="relative">
                    <i id="menu" className="material-icons">menu</i>
                    <Link to='/' id="youtubeLogo" />
                    Youtube
                </div>
                <div className="header__search_Homepage">
                    <form action="">
                        <input id="search_bar_Homepage" type="text" placeholder="Search" onChange={handleSearch} />
                        <button onClick={searchFunction}><i className="material-icons">search</i></button>
                    </form>
                </div>
                <div className="header__icons_Homepage">

                    <div><Link to='/login' className="cr-acc btn btn-info registerButton login-btn">Login</Link></div>

                    {loggedUser ? (
                        <div><button onClick={handleLogOut} className="cr-acc btn btn-info registerButton">Log Out</button></div>
                    ) : (
                        null
                    )}


                    {/* this lines display the userName and the image in right side of search bar*/}
                    {loggedUser ? (
                        <div className="loggedUser__info">
                            <img src={loggedUser.userImgFile} alt="Profile" className="imageFile" />
                            <span className="userName">{loggedUser.userName}</span>
                        </div>
                    ) : (
                        <i className="material-icons display-this">account_circle</i>
                    )}
                </div>
            </div>
        );

    }



    return (
        <div className="header_Homepage">
            <div className="header__left_Homepage" position="relative">
                <i id="menu" className="material-icons">menu</i>
                <Link to='/' id="youtubeLogo" />
                Youtube
            </div>
            <div className="header__search_Homepage">
                <form action="">
                    <input id="search_bar_Homepage" type="text" placeholder="Search" onChange={handleSearch} />
                    <button onClick={searchFunction}><i className="material-icons">search</i></button>
                </form>
            </div>
            <div className="header__icons_Homepage">

                <div><Link to='/addNewVideoScreen' className="cr-acc btn btn-info registerButton">Add New Video</Link></div>
                {/* <div><Link to='/login' className="cr-acc btn btn-info registerButton login-btn">Login</Link></div> */}
                <div><button onClick={handleLogOut} className="cr-acc btn btn-info registerButton">Log Out</button></div>

                {/* this lines display the userName and the image in right side of search bar*/}
                {loggedUser ? (

                    <Link to="/profile" className="loggedUser__link">
                        <div className="loggedUser__info">
                            <img src={loggedUser.userImgFile} alt="Profile" className="imageFile" />
                            <span className="userName">{loggedUser.userName}</span>
                        </div>
                    </Link>
                ) : (
                    <i className="material-icons display-this">account_circle</i>
                )}
            </div>
        </div>
    );

}


export default SearchBar
