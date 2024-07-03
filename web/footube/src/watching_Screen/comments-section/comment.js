import React from 'react';
import './comment.css'; // Make sure to import your CSS file

function Comment({ userName, userImg, comment }) {
    console.log(userImg);
    return (

        <div className='comment-block'>
            {/* <img className="user-image" src={userImg} alt='user' /> //TODO if there is time to fix the image*/} 

            <div className='right-content'>
                <div className='user-name'>
                    {userName}
                </div>
                <div className='comment-text'>
                    <p>{comment}</p>
                </div>
            </div>
        </div>


    );


}
export default Comment;