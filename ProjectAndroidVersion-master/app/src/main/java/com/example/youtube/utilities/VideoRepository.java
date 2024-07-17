package com.example.youtube.utilities;

import android.content.Context;
import android.net.Uri;
import android.util.Log;

import androidx.lifecycle.LifecycleOwner;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import com.example.youtube.api.VideoAPI;


import java.util.List;
import java.util.ArrayList;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class VideoRepository {
    private static final VideoRepository ourInstance = new VideoRepository();
    private List<Video> videos = new ArrayList<>();
    private VideoListData videoListData;
    private ArrayList<VideoItem> videoItemArrayList = new ArrayList<VideoItem>();

    public static VideoRepository getInstance() {
        return ourInstance;
    }

    public VideoRepository() {
        videoListData = new VideoListData();
    }

    public List<Video> getVideos() {
        return videos;
    }


    class VideoListData extends MutableLiveData<List<VideoJson>> {
        private VideoAPI videoAPI;

        public VideoListData() {
            super();
            setValue(new ArrayList<>()); // Initialize with an empty list
            videoAPI = new VideoAPI();
        }

        public void refreshVideos() {
            videoAPI.getVideos(new Callback<List<VideoJson>>() {
                @Override
                public void onResponse(Call<List<VideoJson>> call, Response<List<VideoJson>> response) {
                    if (response.isSuccessful() && response.body() != null) {
                        videoListData.postValue(response.body());

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
        @Override
        protected void onActive() {
            super.onActive();
            // Optionally refresh data when there is an active observer
            refreshVideos();
        }
    }

    public VideoListData getVideoListData(){
        return videoListData;
    }
    public MutableLiveData<List<VideoJson>> getAll(){
        return videoListData;
    }

//    public void set

    public void addVideo(Video video, Uri profileImg, int userId) {
        videos.add(video);
        VideoItem item = new VideoItem(video, userId);
        item.setUserProfileImage(profileImg);
        videoItemArrayList.add(item);
    }


    public Video findVideoById(int id){
        List<Video> videos = VideoRepository.getInstance().getVideos();
        for (Video vid : videos) {
            if (vid.getId() == id) {
                return vid;
            }
        }
        return null;
    }

    public void loadVideosFromJson(Context context, LiveData<List<VideoJson>> vidModel) {
        vidModel.observe((LifecycleOwner) context, videoJsons -> {
            List<Video> videoList = new ArrayList<>();

            String prefixVid = "/images/videos/";
            String prefixImg = "/images/vid-images/";
            for (VideoJson obj : videoJsons) {
                String userName = obj.getArtist();
                int userId = obj.getUser_id();
                String img = obj.getImg();
                String videoSrc = obj.getVideo_src();
                String title = obj.getTitle();
                String publicationDate = obj.getPublication_date();
                String description = obj.getDetails();

                // Get the drawable resource ID from the img string

                String serverToAndroidImg = img.substring(prefixImg.length()).toLowerCase();
                String serverToAndroidVid = videoSrc.substring(prefixVid.length()).toLowerCase();
                int dotIndexImg = serverToAndroidImg.lastIndexOf('.');
                int dotIndexVid = serverToAndroidVid.lastIndexOf('.');
                String imgName = serverToAndroidImg.substring(0, dotIndexImg);
                String vidName = serverToAndroidVid.substring(0, dotIndexVid);
                imgName = imgName.replace('-','_');
                vidName = vidName.replace('-','_');
                if (Character.isDigit(imgName.charAt(0))) {
                    imgName = "a" + imgName;
                }
                int imgResId = context.getResources().getIdentifier(imgName, "drawable", context.getPackageName());
                int videoResId = context.getResources().getIdentifier(vidName, "raw", context.getPackageName());

                if (videoResId == 0 || imgResId == 0) {
                    continue;
                }

                Video video = new Video(userName,
                        userId,
                        Uri.parse("android.resource://" + context.getPackageName() + "/" + imgResId),
                        Uri.parse("android.resource://" + context.getPackageName() + "/" + videoResId),
                        title,
                        publicationDate,
                        description);
                videoList.add(video);
            }

            videos.clear();
            videos.addAll(videoList);
        });
    }


    public ArrayList<VideoItem> getVideoItemArrayList(){
        return this.videoItemArrayList;
    }

    public void addItemToVideoItemArrayList(VideoItem videoItem){
        this.videoItemArrayList.add(videoItem);
    }

}