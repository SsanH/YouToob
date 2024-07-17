package com.example.youtube.VideoScreen.Comments;

import java.util.ArrayList;
import java.util.List;

public class CommentRepository {

    private static final CommentRepository instance = new CommentRepository();

    private ArrayList<CommentItem> comments = new ArrayList<>();
    public static CommentRepository getInstance() {
        return instance;
    }

    public ArrayList<CommentItem> getComments() {
        return comments;
    }

    public void addComment(CommentItem comment) {
        comments.add(comment);
    }

    public ArrayList<CommentItem> findCommentByVideoId(int videoId) {
        ArrayList<CommentItem> allComments = CommentRepository.getInstance().getComments();
        ArrayList<CommentItem> filteredComments = new ArrayList<>();

        for (CommentItem comment : allComments) {
            if (comment.getVideoId() == videoId) {
                filteredComments.add(comment);
            }
        }

        return filteredComments;
    }

    public CommentItem findCommentByCommentId(int commentId){
        List<CommentItem> comments = CommentRepository.getInstance().getComments();
        for (CommentItem comment : comments) {
            if (comment.getVideoId() == commentId) {
                return comment;
            }
        }
        return null;
    }
}
