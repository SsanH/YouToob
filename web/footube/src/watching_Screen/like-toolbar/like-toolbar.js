import React, { useState } from 'react';
import "./like-toolbar.css";

function LikeToolbar({ userName, userImg, likeCount, liked, disliked, handleLike, handleDislike }) {
    const [showModal, setShowModal] = useState(false);

    const handleShareClick = () => {
        // Open modal when "Share" button is clicked
        setShowModal(true);
        document.body.classList.add('modal-open'); // Add class to body to darken the background
    };

    const handleCloseModal = () => {
        setShowModal(false);
        document.body.classList.remove('modal-open'); // Remove class from body to remove backdrop
    };

    return (
        <div className="bar">
            <div className="left-content-tool">
                <img className="card-image" src={userImg} alt="User" />
                <div className="card-details">
                    <h1 className="card-name">{userName}</h1>
                </div>
            </div>

            <div className="right-content-tool">
                <div className="other-buttons">
                    <div className='like-dislike'>
                        <div className='like-amount'><p>{likeCount} likes</p></div>
                        <button type="button" className="btn btn-light" onClick={handleLike}>{liked ? 'Unlike' : 'Like'}</button>
                        <button type="button" className="btn btn-light" onClick={handleDislike}>{disliked ? 'Undislike' : 'Dislike'}</button>
                    </div>
                    <button type="button" className="btn btn-lg btn-secondary" onClick={handleShareClick}>Share</button>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal fade show" id='fadedByReut' tabIndex="-1" role="dialog" >
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Share the video</h5>
                                <button type="button" className="close" onClick={handleCloseModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {/* Add your modal body content here */}
                                <div className="modal-images">
                                    <img src="\images\icons\telegramIcon.png" alt="Telegram Icon" />
                                    <img src="\images\icons\gmail.png" alt="Gmail Icon" />
                                    <img src="\images\icons\xIcon.png" alt="X Icon" />
                                    <img src="\images\icons\whatsappicon.jpg" alt="WhatsApp Icon" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showModal && <div className="modal-backdrop fade show"></div>}
        </div>
    );
}

export default LikeToolbar;
