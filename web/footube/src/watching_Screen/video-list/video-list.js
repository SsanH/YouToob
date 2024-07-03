import React, { useState, useEffect } from 'react';
import './video-list.css';
import { Link } from 'react-router-dom';

function VideoList({ videoData }) {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        setVideos(videoData);
    }, [videoData]);

    const DisplayVideoList = () => (
        <div className="video-list">
            {videos.map((video) => (
                <Link key={video.id} to={`/watch/${video.id}`}>
                    <div className="video-item">
                        <div className="video-thumbnail">
                            <img src={video.img} alt={video.title} />
                        </div>
                        <div className="video-details">
                            <h3 className="video-title">{video.title}</h3>
                            <p className='video-meta'>{video.artist}</p>
                            <p className="video-meta">
                                {video.views} views &bull; {video.publication_date}
                            </p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );

    return <DisplayVideoList />;
}

export default VideoList;
