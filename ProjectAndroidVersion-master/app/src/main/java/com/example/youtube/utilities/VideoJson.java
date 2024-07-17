package com.example.youtube.utilities;
import androidx.room.ColumnInfo;
import androidx.room.Entity;
import androidx.room.PrimaryKey;


@Entity(tableName = "videos")
public class VideoJson {
    private static int nextId = 0;// Static variable to keep track of the next ID
    @PrimaryKey
    @ColumnInfo(name = "id")
    private int id;
    @ColumnInfo(name = "img")
    private String img;
    @ColumnInfo(name = "video_src")
    private String video_src;
    @ColumnInfo(name = "title")
    private String title;
    @ColumnInfo(name = "artist")
    private String artist;
    @ColumnInfo(name = "publication_date")
    private String publication_date;
    @ColumnInfo(name = "details")
    private  String details;
    @ColumnInfo(name = "views")
    private String views;
    @ColumnInfo(name = "likes")
    private int likes;
    @ColumnInfo(name = "user_id")
    private int user_id;
    private int likeFlag;

    //constructor.
    public VideoJson(String artist, int user_id, String img, String video_src, String title, String publication_date, String details){
        this.id  = nextId++;
        this.artist = artist;
        this.user_id = user_id;
        this.img = img;
        this.video_src = video_src;
        this.title = title;
        this.publication_date = publication_date;
        this.details = details;
        this.views = "0";
        this.likes = 0;
        this.likeFlag =0;
    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getArtist() {
        return artist;
    }
    public int getLikeFlag(){
        return likeFlag;
    }
    public void setLikeFlag(int likeFlag){
        this.likeFlag = likeFlag;
    }
    public void setUserName(String userName) {
        this.artist = userName;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUserId(int userId) {
        this.user_id = userId;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public String getVideo_src() {
        return video_src;
    }

    public void setVideoSrc(String videoSrc) {
        this.video_src = videoSrc;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPublication_date() {
        return publication_date;
    }

    public void setPublicationDate(String publicationDate) {
        this.publication_date = publication_date;
    }

    public String getDetails() {
        return details;
    }

    public void setDescription(String description) {
        this.details = description;
    }

    public String getViews() {
        return views;
    }

    public void setViews(String views){
        this.views = views;
    }


    public int getLikes() {
        return likes;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }

    public void likeButtonClicked(){
        if(this.likeFlag == 0){
            this.likes++;
            this.likeFlag = 1;
        }
        if(this.likeFlag == -1){
            this.likes++;
            this.likeFlag = 0;
        }
    }


    public void unLikeButtonClicked() {
        if(this.likeFlag == 1){
            this.likes--;
            this.likeFlag = 0;
        }
        if(this.likeFlag == 0){
            this.likes--;
            this.likeFlag = -1;
        }
    }
}