package com.example.youtube.VideoScreen.Comments;

import android.net.Uri;

import com.example.youtube.utilities.Video;

public class CommentItem {

    String text;
    int commentId;
    int videoId;
    int userId;
    private static int nextId = 0;
    private Uri profileImage;
    private String userName;

    public CommentItem(Video video, String text, int userId, Uri profileImage, String userName) {
        this.commentId  = nextId++;
        this.videoId = video.getId();
        this.text = text;
        this.userId = userId;
        this.profileImage = profileImage;
        this.userName = userName;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public int getCommentId(){
        return this.commentId;
    }
public int getVideoId(){
        return this.videoId;
}

public String getUserName(){
//        return UserRepository.getInstance().findUserById(this.userId).getDisplayName();
        return this.userName;
    }

    public Uri getProfileImage() {
        return profileImage;
    }

    // Interface for click events
    public interface OnCommentItemClickListener {
        void onDeleteClick(int commentId);
        // Add more methods as needed, e.g., edit comment, like comment, etc.
    }

    // Instance of the interface
    private OnCommentItemClickListener listener;

    // Setter for the listener
    public void setOnCommentItemClickListener(OnCommentItemClickListener listener) {
        this.listener = listener;
    }

    // Method to handle delete comment action
    public void deleteComment() {
        if (listener != null) {
            listener.onDeleteClick(commentId);
        }
    }


}
