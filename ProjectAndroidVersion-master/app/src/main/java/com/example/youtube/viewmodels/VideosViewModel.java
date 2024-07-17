package com.example.youtube.viewmodels;

import android.util.Log;

import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;
import androidx.lifecycle.LiveData;

import com.example.youtube.utilities.VideoJson;
import com.example.youtube.utilities.VideoRepository;

import com.example.youtube.api.VideoAPI;

import java.io.Serializable;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class VideosViewModel extends ViewModel implements Serializable {

    private MutableLiveData<List<VideoJson>> videosLiveData = new MutableLiveData<>();
    private VideoRepository videoRepository;
    private VideoAPI videoAPI = new VideoAPI();

    public VideosViewModel(){
        fetchVideos();  // Asynchronously fetch videos on ViewModel initialization
        videoRepository = VideoRepository.getInstance();
    }



    public LiveData<List<VideoJson>> getVideosLiveData(){
        return videosLiveData;
    }

    public VideoRepository getVideoRepository(){
        return videoRepository;
    }

    public void fetchVideos() {
        videoAPI.getVideos(new Callback<List<VideoJson>>() {
                    @Override
                    public void onResponse(Call<List<VideoJson>> call, Response<List<VideoJson>> response) {
                        if (response.isSuccessful() && response.body() != null) {
                            videosLiveData.setValue(response.body());
                        } else {
                            // Log the error response and use the onError consumer to handle it
                            Log.e("VideoAPI", "Server response is not successful: " + response.errorBody().toString());
                        }
                    }

                    @Override
                    public void onFailure(Call<List<VideoJson>> call, Throwable t) {
                        Log.e("VideoAPI", "Failed to fetch videos: " + t.getMessage());
                    }
                });
    }
}

