package com.example.youtube.api;

import android.content.Context;

import com.example.youtube.TypeConverter.UploadedVidsConverter;
import com.example.youtube.TypeConverter.UriConverter;
import com.example.youtube.utilities.User;
import com.example.youtube.utilities.VideoJson;
import androidx.room.Room;
import androidx.room.Database;
import androidx.room.RoomDatabase;
import androidx.room.TypeConverters;

@Database(entities = {User.class, VideoJson.class} ,version = 1)
@TypeConverters({UploadedVidsConverter.class, UriConverter.class})
public abstract class AppDB extends RoomDatabase {
    private static AppDB instance;
    public abstract VideoDao videoDao();
    public abstract UserDao userDao();
    public static AppDB getInstance(Context context) {
        if (instance == null) {
            instance = Room.databaseBuilder(context.getApplicationContext(), AppDB.class, "Footube")
                    .allowMainThreadQueries()
                    .fallbackToDestructiveMigration()
                    .build();
        }
        return instance;
    }



}