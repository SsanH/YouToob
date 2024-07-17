package com.example.youtube.api;

import androidx.room.Dao;
import androidx.room.Query;

import com.example.youtube.utilities.VideoJson;

import java.util.List;

@Dao
public interface VideoDao {
    @Query("SELECT * FROM videos")
    List<VideoJson> getVideos();



}
