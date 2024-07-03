import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LikeToolbar from './like-toolbar'; // Adjust the import path as needed

function LikesHandler({ userName, userImg, vidLikes, likesData, setLikesData }) {
    const { vid_id } = useParams();
    const intId = parseInt(vid_id, 10);

    const [likeCount, setLikeCount] = useState(vidLikes);
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);

    useEffect(() => {
        if (likesData[intId]) {
            setLikeCount(likesData[intId].likeCount);
            setLiked(likesData[intId].liked);
            setDisliked(likesData[intId].disliked);
        } else {
            setLikeCount(vidLikes);
            setLiked(false);
            setDisliked(false);
        }
    }, [vid_id, vidLikes, likesData, intId]);

    const handleLike = () => {
        if (liked) {
            setLikeCount(prevCount => prevCount - 1);
            setLiked(false);
            setLikesData(prev => ({ ...prev, [intId]: { ...prev[intId], likeCount: likeCount - 1, liked: false } }));
        } else {
            setLikeCount(prevCount => prevCount + (disliked ? 2 : 1));
            setLiked(true);
            setDisliked(false);
            setLikesData(prev => ({
                ...prev,
                [intId]: {
                    ...prev[intId],
                    likeCount: likeCount + (disliked ? 2 : 1),
                    liked: true,
                    disliked: false
                }
            }));
        }
    };

    const handleDislike = () => {
        if (disliked) {
            setLikeCount(prevCount => prevCount + 1);
            setDisliked(false);
            setLikesData(prev => ({ ...prev, [intId]: { ...prev[intId], likeCount: likeCount + 1, disliked: false } }));
        } else {
            setLikeCount(prevCount => prevCount - (liked ? 2 : 1));
            setLiked(false);
            setDisliked(true);
            setLikesData(prev => ({
                ...prev,
                [intId]: {
                    ...prev[intId],
                    likeCount: likeCount - (liked ? 2 : 1),
                    liked: false,
                    disliked: true
                }
            }));
        }
    };

    return (
        <div>
            <LikeToolbar
                userName={userName}
                userImg={userImg}
                likeCount={likeCount}
                liked={liked}
                disliked={disliked}
                handleLike={handleLike}
                handleDislike={handleDislike}
            />
        </div>
    );
}

export default LikesHandler;
