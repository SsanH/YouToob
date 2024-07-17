package com.example.youtube.viewmodels;

import android.os.Parcel;
import android.os.Parcelable;
import android.util.Log;

import androidx.lifecycle.ViewModel;
import androidx.lifecycle.LiveData;

import com.example.youtube.utilities.User;
import com.example.youtube.utilities.UserJson;
import com.example.youtube.utilities.UserRepository;

import com.example.youtube.api.UserAPI;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class UsersViewModel extends ViewModel implements Parcelable {
    //implement Parcelable

    private UserRepository userRepository;
    private UserAPI userAPI = new UserAPI();
    protected UsersViewModel(Parcel in) {
    }

    public static final Creator<UsersViewModel> CREATOR = new Creator<UsersViewModel>() {
        @Override
        public UsersViewModel createFromParcel(Parcel in) {
            return new UsersViewModel(in);
        }

        @Override
        public UsersViewModel[] newArray(int size) {
            return new UsersViewModel[size];
        }
    };

    @Override
    public int describeContents() {return 0;}

    @Override
    public void writeToParcel(Parcel dest, int flags) {
    }

    public UsersViewModel() {
        userRepository = new UserRepository();
        fetchUsers();  // Asynchronously fetch videos on ViewModel initialization
    }

    public UsersViewModel(UsersViewModel usersViewModel) {
        this.userRepository = usersViewModel.getUserRepository();

    }



    public LiveData<List<UserJson>> getUsersLiveData() {
        return userRepository.getUsersLiveData();
    }

    public UserRepository getUserRepository() {
        return userRepository;
    }

    public List<User> getUsers() {
        return userRepository.getUsers();
    }

    public void fetchUsers(){
        userAPI.fetchUsers(new Callback<List<UserJson>>() {
                    @Override
                    public void onResponse(Call<List<UserJson>> call, Response<List<UserJson>> response) {
                        if (response.isSuccessful() && response.body() != null) {
                            Log.d("UserAPI", "Successfully fetched users: ");
                            userRepository.getUsersLiveData().setValue(response.body());
                        } else {
                            // Log the error response and use the onError consumer to handle it
                            Log.e("UserAPI", "Server response is not successful: " + response.errorBody().toString());
                        }
                    }

                    @Override
                    public void onFailure(Call<List<UserJson>> call, Throwable t) {
                        Log.e("UserAPI", "Failed to fetch users: " + t.getMessage());
                    }
                });
    }

    public void addUserToDataBase(UserJson user) {
        userAPI.createUser(user, new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                if (response.isSuccessful()) {
                    Log.d("UserAPI", "Successfully added user to database");
                } else {
                    Log.e("UserAPI", "Failed to add user to database: " + response.errorBody().toString());
                }
            }
            @Override
            public void onFailure(Call<Void> call, Throwable t) {
                Log.e("UserAPI", "Failed to add user to database: " + t.getMessage());
            }
        });
    }


}

