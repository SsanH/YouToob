package com.example.youtube.Activities;

import static com.example.youtube.utilities.MyApplication.context;

import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.util.Base64;
import android.view.View;
import android.view.inputmethod.EditorInfo;
import android.view.inputmethod.InputMethodManager;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.TextView;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.youtube.R;
import com.example.youtube.utilities.RecyclerViewInterface;
import com.example.youtube.utilities.User;
import com.example.youtube.utilities.UserJson;
import com.example.youtube.utilities.Video;
import com.example.youtube.utilities.VideoItem;
import com.example.youtube.utilities.VideoItemsRecyclerViewAdapter;
import com.example.youtube.utilities.VideoRepository;
import com.example.youtube.api.AppDB;
import com.example.youtube.api.UserDao;
import com.example.youtube.utilities.firstInit;
import com.example.youtube.viewmodels.UsersViewModel;
import com.example.youtube.viewmodels.VideosViewModel;

import java.util.ArrayList;
import java.util.List;


public class Homepage extends AppCompatActivity implements RecyclerViewInterface {
    private VideosViewModel vidModel;
    private UsersViewModel userModel;
    private UserDao userDao;
    private RecyclerView recyclerView;
    private List<User> userList;
    private AppDB appDB;
    private VideoItemsRecyclerViewAdapter adapter;
    private ArrayList<VideoItem> videoItemArrayList = new ArrayList<>();  // Initialized here
    private int loggedUserId = -1;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_homepage);

        vidModel = new ViewModelProvider(this).get(VideosViewModel.class);
        userModel = new ViewModelProvider(this).get(UsersViewModel.class);

        Intent intent = getIntent();
        loggedUserId = intent.getIntExtra("loggedUserId", -1);

        userModel.getUsersLiveData().observe(this, users -> {
            updateUsers(users);
            updateVideos();

        });

        appDB = AppDB.getInstance(this);
        userDao = appDB.userDao();
        recyclerView = findViewById(R.id.homepage_otherVideosLibrary);
        adapter = new VideoItemsRecyclerViewAdapter(this, videoItemArrayList, this);

        recyclerView.setAdapter(adapter);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));

        initDatabase();

        setupSearchBar();
        setupUserInteractionButtons();
    }

    private void initDatabase() {
        if (firstInit.getInstance().isInit() == 0) {

            VideoRepository.getInstance().loadVideosFromJson(this, vidModel.getVideosLiveData());
            videoItemArrayList.clear();

            firstInit.getInstance().setInited();
        }
    }

    public void updateVideos(){
        vidModel.getVideosLiveData().observe(this, videosJson -> {
            videoItemArrayList.clear();
            List<Video> vidList = vidModel.getVideoRepository().getVideos();
            for (int i = 0; i < vidList.size(); i++) {
                VideoItem video = new VideoItem(vidList.get(i), vidList.get(i).getUserId());
                video.setUserProfileImage(userModel.getUsers().get(vidList.get(i).getUserId() -1 ).getUserImgFile());

                videoItemArrayList.add(video);
            }
            adapter.notifyDataSetChanged();  // Notify the adapter of data change on the main thread
        });
    }


    public void updateUsers(List<UserJson> userJsons) {
        List<User> userList = new ArrayList<>();
        String prefixImg = "/images/users-images/";
        for (UserJson obj : userJsons) {
            int id = obj.getId();
            String userName = obj.getUserName();
            String password = obj.getPassword();
            String displayName = obj.getDisplayName();
            String profileImage = obj.getUserImgFile();
            int[] uploadedVids = obj.getUploadedVids();

            if (profileImage.isEmpty()) {
                User user = new User(userName,
                        password,
                        displayName,
                        Uri.parse("android.resource://" + context.getPackageName() + "/" + R.drawable.def),
                        uploadedVids);
                user.setId(id);
                userList.add(user);
                continue;
            }

            String serverToAndroidImg = profileImage.substring(prefixImg.length()).toLowerCase();
            int dotIndexImg = serverToAndroidImg.lastIndexOf('.');
            if (dotIndexImg == -1) {
                User user = new User(userName,
                        password,
                        displayName,
                        base64ToUri(profileImage),
                        uploadedVids);
                user.setId(id);
                userList.add(user);
            }
            String imgName = serverToAndroidImg.substring(0, dotIndexImg);

            int imgResId = context.getResources().getIdentifier(imgName, "drawable", context.getPackageName());
            if (imgResId == 0) {
                User user = new User(userName,
                        password,
                        displayName,
                        Uri.parse("android.resource://" + context.getPackageName() + "/" + R.drawable.def),
                        uploadedVids);
                user.setId(id);
                userList.add(user);
                continue;
            }
            User user = new User(userName,
                    password,
                    displayName,
                    Uri.parse("android.resource://" + context.getPackageName() + "/" + imgResId),
                    uploadedVids);
            user.setId(id);
            userList.add(user);
        }

        userModel.getUsers().clear();
        userModel.getUsers().addAll(userList);
        userDao.getUsers();
        adapter.notifyDataSetChanged();;
        setLoggedUser();
    }

    public void setLoggedUser() {
        if (loggedUserId != -1) {
            userModel.getUserRepository().setLoggedUser(userModel.getUserRepository().findUserById(loggedUserId));
            TextView loginTextView = findViewById(R.id.homepage_user_profile);
            loginTextView.setText(userModel.getUserRepository().findUserById(loggedUserId).getDisplayName());
        }
        updateUserImage(userModel.getUserRepository().getLoggedUser());
    }

    public Uri base64ToUri(String base64) {
        byte[] decodedString = Base64.decode(base64, Base64.DEFAULT);
        Bitmap decodedByte = BitmapFactory.decodeByteArray(decodedString, 0, decodedString.length);
        String path = MediaStore.Images.Media.insertImage(context.getContentResolver(), decodedByte, "Title", null);
        return Uri.parse(path);
    }

    private void setupSearchBar() {
        ImageButton searchButton = findViewById(R.id.homepage_search_button);
        final EditText searchBar = findViewById(R.id.homepage_search_bar);
        searchButton.setOnClickListener(v -> {
            if (searchBar.getVisibility() == View.GONE) {
                searchBar.setVisibility(View.VISIBLE); // Show the search bar if it is hidden
            }
            searchBar.requestFocus(); // Focus the search bar
            InputMethodManager imm = (InputMethodManager) getSystemService(Context.INPUT_METHOD_SERVICE);
            imm.showSoftInput(searchBar, InputMethodManager.SHOW_IMPLICIT); // Show the keyboard
        });

        searchBar.setOnEditorActionListener((v, actionId, event) -> {
            if (actionId == EditorInfo.IME_ACTION_DONE) {
                String txt = searchBar.getText().toString();
                Toast.makeText(getApplicationContext(), txt, Toast.LENGTH_SHORT).show();
                searchBar.setVisibility(View.GONE);
                hideKeyboard(searchBar);
                return true;
            }
            return false;
        });
    }

    private void setupUserInteractionButtons() {
        onUserButtonClick();
        onAddNewVideoClick();
        onClickOfLogOut();
    }

    private void hideKeyboard(View view) {
        InputMethodManager imm = (InputMethodManager) getSystemService(Context.INPUT_METHOD_SERVICE);
        imm.hideSoftInputFromWindow(view.getWindowToken(), 0);
    }

    @Override
    public void onItemClick(int position) {
        Intent intent = new Intent(this, WatchingPage.class);
        intent.putExtra("User", userModel.getUserRepository().getLoggedUser());
        int a = this.videoItemArrayList.get(position).getUserId();
        intent.putExtra("Uploader", userModel.getUserRepository().findUserById(this.videoItemArrayList.get(position).getUserId()));
        intent.putExtra("VIDEO_ID", this.videoItemArrayList.get(position).getId());
        startActivity(intent);
    }

    public void updateUserImage(User user) {
        ImageButton userButton = findViewById(R.id.homepage_user_button);
        if (user != null && user.getUserImgFile() != null) {
            userButton.setImageURI(user.getUserImgFile());
        } else {
            userButton.setImageResource(R.drawable.def);
        }
    }

    public void onUserButtonClick() {
        findViewById(R.id.homepage_user_button).setOnClickListener(v -> {
            if(userModel.getUserRepository().getLoggedUser() != null) {
                Intent goToProfile = new Intent(this, ProfileScreen.class);
                goToProfile.putExtra("loggedUserId", userModel.getUserRepository().getLoggedUser().getId());
                goToProfile.putExtra("UserRepository", userModel.getUserRepository());
                startActivity(goToProfile);
            } else {
                Intent goToLogin = new Intent(this, LoginScreen.class);
                goToLogin.putExtra("UserRepository", userModel.getUserRepository());
                goToLogin.putExtra("UserModel", userModel);
                startActivity(goToLogin);
            }
        });
    }

    public void onAddNewVideoClick() {
        //i want to forward UserRepostry to AddNewVideoScreen
        findViewById(R.id.homepage_add_button).setOnClickListener(v -> {
        if (userModel.getUserRepository().getLoggedUser() == null) {
            Toast.makeText(this, "please login to upload a video", Toast.LENGTH_SHORT).show();
        } else {
                Intent goToLogin = new Intent(this, AddNewVideoScreen.class);
                goToLogin.putExtra("UserRepository", userModel.getUserRepository());
                startActivity(goToLogin);
            }
        });
    }

    public void onClickOfLogOut() {
        findViewById(R.id.logOutButton).setOnClickListener(v -> {
            userModel.getUserRepository().setLoggedUser(null);
            Intent stayInHomePage = new Intent(this, Homepage.class);
            finish();
            startActivity(stayInHomePage);
        });
    }
}
