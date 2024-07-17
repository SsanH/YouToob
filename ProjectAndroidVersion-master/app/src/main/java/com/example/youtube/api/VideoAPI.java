package com.example.youtube.api;

import com.example.youtube.utilities.VideoJson;

import java.util.List;

import retrofit2.Retrofit;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.converter.gson.GsonConverterFactory;

public class VideoAPI {
    private Retrofit retrofit;
    private WebServiceAPI webServiceAPI;

    public VideoAPI() {
        retrofit = new retrofit2.Retrofit.Builder()
                .baseUrl("http://10.0.2.2:12345/")
                .addConverterFactory(GsonConverterFactory.create())
                .build();
        webServiceAPI = retrofit.create(WebServiceAPI.class);
    }

    public void getVideos(Callback<List<VideoJson>> callback) {
        Call<List<VideoJson>> call = webServiceAPI.getVideos(); // Assuming webServiceAPI.getVideos() returns a Call<List<VideoJson>>
        call.enqueue(callback);
    }

    public void uploadVideo(VideoJson video, Callback<VideoJson> callback) {
        Call<VideoJson> call = webServiceAPI.uploadVideo(video);
        call.enqueue(callback);

    }

}
