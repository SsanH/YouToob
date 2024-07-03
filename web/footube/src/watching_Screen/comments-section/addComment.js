import React, { useState } from 'react';
import { useParams } from 'react-router-dom';


async function addCommentDB(newComment) {
    const response = await fetch('http://localhost:12345/comments/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( newComment )
    });

    if (response.ok) {
        const newComment = await response.json();
        console.log('comment added:', newComment);
    } else {
        console.error('Failed to add user', await response.json());
    }
}


function AddComment({ addComment , commentId, loggedUser}) {

    const { vid_id } = useParams();
    const intId = parseInt(vid_id, 10);

    console.log(commentId);
    const [newCommentText, setNewCommentText] = useState("");
    const newCommentUser = loggedUser.displayName; 
    const newCommentImage = loggedUser.userImgFile;
    const [newCommentId, setNewCommentId] = useState("");


    const handleAddComment = async () => {
        const newComment = {
            video_id: intId,
            userName: newCommentUser,
            userImg: newCommentImage,
            comment: newCommentText,
            comment_id: commentId
        };
        addComment(newComment);
        setNewCommentText("");
        setNewCommentId("");
        const addedCom = await addCommentDB(newComment);
    };



    return (
        <div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label"></label>
                <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    placeholder="Comment.."
                ></textarea>
            </div>
            <button type="button" class="btn btn-outline-secondary" onClick={handleAddComment}>Send</button>
        </div>
    );


}

export default AddComment;