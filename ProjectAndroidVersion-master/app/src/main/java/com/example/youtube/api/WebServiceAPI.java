package com.example.youtube.api;

import com.example.youtube.utilities.Video;
import com.example.youtube.utilities.VideoJson;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Path;

public interface WebServiceAPI {
    @GET("videos")
    Call <List<VideoJson>> getVideos();

    @POST("videos/upload")
    Call<VideoJson> uploadVideo(@Body VideoJson videoJson);

    @DELETE("posts/{id}")
    Call<Void> deletePost(@Path("id") int id);

}
