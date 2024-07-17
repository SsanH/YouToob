package com.example.youtube.utilities;

import android.net.Uri;

import androidx.annotation.NonNull;
import androidx.room.ColumnInfo;
import androidx.room.Entity;
import androidx.room.PrimaryKey;
import androidx.room.TypeConverter;
import androidx.room.TypeConverters;

import com.example.youtube.TypeConverter.UploadedVidsConverter;
import com.example.youtube.TypeConverter.UriConverter;

import java.io.Serializable;

@Entity(tableName = "users")
@TypeConverters({UploadedVidsConverter.class, UriConverter.class})
public class UserJson implements Serializable {
    private static int nextId = 1;// Static variable to keep track of the next ID
    @PrimaryKey
    @ColumnInfo(name = "id")
    private int userId = 1;
    @ColumnInfo(name = "userName")
    private String userName;
    @ColumnInfo(name = "userPassword")
    private String userPassword;
    @ColumnInfo(name = "displayName")
    private String displayName;
    @ColumnInfo(name = "userImgFile")
    private String userImgFile;
    @ColumnInfo(name = "uploadedVids")

    private int[] uploadedVids;

    public UserJson(int userId, String userName, String password, String displayName, String userImgFile, int[] uploadedVids){
        this.userId = userId;
        this.userName = userName;
        this.userPassword = password;
        this.displayName = displayName;
        this.userImgFile = userImgFile;
        this.uploadedVids = uploadedVids;
    }



    public int getId() {
        return userId;
    }

    public String getUserName() {
        return userName;
    }

    public String getPassword() {
        return userPassword;
    }

    public String getDisplayName() {
        return displayName;
    }

    public String getUserImgFile() {
        return userImgFile;
    }

    public void setId(int id) {
        this.userId = id;
    }

    public int[] getUploadedVids(){
        if (this.uploadedVids != null){
            return this.uploadedVids;
        }
        return null;
    }


    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setPassword(String password) {
        this.userPassword = password;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public void setProfileImage(String profileImage) {
        this.userImgFile = profileImage;
    }
}
