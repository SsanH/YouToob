package com.example.youtube.Activities;

import android.content.Intent;
import android.os.Bundle;
import android.widget.ImageButton;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.youtube.R;
import com.example.youtube.utilities.RecyclerViewInterface;
import com.example.youtube.utilities.User;
import com.example.youtube.utilities.UserRepository;
import com.example.youtube.utilities.Video;
import com.example.youtube.utilities.VideoItem;
import com.example.youtube.utilities.VideoItemsRecyclerViewAdapter;
import com.example.youtube.utilities.VideoRepository;
import com.example.youtube.api.AppDB;
import com.example.youtube.api.UserDao;

import java.util.ArrayList;
import java.util.List;

public class ProfileScreen extends AppCompatActivity implements RecyclerViewInterface {
    private User user;
    private UserDao userDao;
    private RecyclerView recyclerView;
    private AppDB appDB;
    private VideoItemsRecyclerViewAdapter adapter;
    private ArrayList<VideoItem> videoItemArrayList = new ArrayList<>();  // Initialized here
    private int loggedUserId = -1;
    private UserRepository userRepository;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profile_screen);;

        Intent intent = getIntent();
        loggedUserId = intent.getIntExtra("loggedUserId", -1);
        userRepository = intent.getParcelableExtra("UserRepository");
        setLoggedUser();
        recyclerView = findViewById(R.id.profile_screen_otherVideosLibrary);
        adapter = new VideoItemsRecyclerViewAdapter(this, videoItemArrayList, this);
        recyclerView.setAdapter(adapter);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        updateVideos();
        setupUserInteractionButtons();
    }

    public void updateVideos() {
            videoItemArrayList.clear();
            List<Video> vidList = VideoRepository.getInstance().getVideos();
            for (int i = 0; i < vidList.size(); i++) {
                if (vidList.get(i).getUserId() == userRepository.getLoggedUser().getId()) {
                    VideoItem video = new VideoItem(vidList.get(i), vidList.get(i).getUserId());
                    video.setUserProfileImage(userRepository.getUsers().get(vidList.get(i).getUserId() - 1).getUserImgFile());

                    videoItemArrayList.add(video);
                }
            }
        adapter.notifyDataSetChanged();  // Notify the adapter of data change on the main thread
    }



    public void setLoggedUser() {
        if (loggedUserId != -1) {
            userRepository.setLoggedUser(userRepository.findUserById(loggedUserId));
            TextView loginTextView = findViewById(R.id.profile_screen_user_profile_screen);
            loginTextView.setText(userRepository.findUserById(loggedUserId).getDisplayName());
            TextView displayNameTextView = findViewById(R.id.profile_screen_display_name);
            displayNameTextView.setText(userRepository.findUserById(loggedUserId).getDisplayName());
        }
        updateUserImage(userRepository.getLoggedUser());
    }


    private void setupUserInteractionButtons() {
        onUserButtonClick();
        onAddNewVideoClick();
        onClickOfLogOut();
    }


    @Override
    public void onItemClick(int position) {
        Intent intent = new Intent(this, WatchingPage.class);
        intent.putExtra("User", userRepository.getLoggedUser());
        int a = this.videoItemArrayList.get(position).getUserId();
        intent.putExtra("Uploader", userRepository.findUserById(this.videoItemArrayList.get(position).getUserId()));
        intent.putExtra("VIDEO_ID", this.videoItemArrayList.get(position).getId());
        startActivity(intent);
    }

    public void updateUserImage(User user) {
        ImageButton userButton = findViewById(R.id.profile_screen_user_button);
        if (user != null && user.getUserImgFile() != null) {
            userButton.setImageURI(user.getUserImgFile());
        } else {
            userButton.setImageResource(R.drawable.def);
        }
    }

    public void onUserButtonClick() {
        findViewById(R.id.profile_screen_user_button).setOnClickListener(v -> {
            Intent goToProfile = new Intent(this, Homepage.class);
            goToProfile.putExtra("loggedUserId", userRepository.getLoggedUser().getId());
            startActivity(goToProfile);
            });
    }

    public void onAddNewVideoClick() {
        findViewById(R.id.profile_screen_add_button).setOnClickListener(v -> {
            Intent goToLogin = new Intent(this, AddNewVideoScreen.class);
            goToLogin.putExtra("UserRepository", userRepository);
            startActivity(goToLogin);
        });
    }

    public void onClickOfLogOut() {
        findViewById(R.id.profile_screen_logOutButton).setOnClickListener(v -> {
            userRepository.setLoggedUser(null);
            Intent stayInHomePage = new Intent(this, Homepage.class);
            finish();
            startActivity(stayInHomePage);
        });
    }
}