package com.example.youtube.utilities;

import android.net.Uri;
import android.os.Parcel;
import android.os.Parcelable;

import androidx.room.ColumnInfo;
import androidx.room.Entity;
import androidx.room.PrimaryKey;
import androidx.room.TypeConverters;

import com.example.youtube.TypeConverter.UploadedVidsConverter;
import com.example.youtube.TypeConverter.UriConverter;

@Entity(tableName = "users")
@TypeConverters({UploadedVidsConverter.class, UriConverter.class})
public class User implements Parcelable {

    protected User(Parcel in) {
        id = in.readInt();
        userName = in.readString();
        password = in.readString();
        displayName = in.readString();
        userImgFile = in.readParcelable(Uri.class.getClassLoader());
        uploadedVids = in.createIntArray();
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeInt(id);
        dest.writeString(userName);
        dest.writeString(password);
        dest.writeString(displayName);
        dest.writeParcelable(userImgFile, flags);
        dest.writeIntArray(uploadedVids);
    }

    @Override
    public int describeContents() {
        return 0;
    }

    public static final Creator<User> CREATOR = new Creator<User>() {
        @Override
        public User createFromParcel(Parcel in) {
            return new User(in);
        }

        @Override
        public User[] newArray(int size) {
            return new User[size];
        }
    };


    private static int nextId = 1;// Static variable to keep track of the next ID
    @PrimaryKey
    @ColumnInfo(name = "id")
    private int id = 1;
    @ColumnInfo(name = "userName")
    private String userName;
    @ColumnInfo(name = "userPassword")
    private String password;
    @ColumnInfo(name = "displayName")
    private String displayName;
    @ColumnInfo(name = "userImgFile")
    private Uri userImgFile;
    @ColumnInfo(name = "uploadedVids")
    private int[] uploadedVids;

    public User(String userName, String password, String displayName, Uri userImgFile, int[] uploadedVids){
        this.id = nextId++; // Assign the next ID and then increment it
        this.userName = userName;
        this.password = password;
        this.displayName = displayName;
        this.userImgFile = userImgFile;
        this.uploadedVids = uploadedVids;
    }



    public int getId() {
        return id;
    }

    public String getUserName() {
        return userName;
    }

    public String getPassword() {
        return password;
    }

    public String getDisplayName() {
        return displayName;
    }

    public Uri getUserImgFile() {
        return userImgFile;
    }

    public void setId(int id) {
        this.id = id;
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
        this.password = password;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public void setProfileImage(Uri profileImage) {
        this.userImgFile = profileImage;
    }
}
