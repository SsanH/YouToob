package com.example.youtube.utilities;

import android.content.Context;
import android.net.Uri;
import android.os.Parcel;
import android.os.Parcelable;
import android.util.Log;

import androidx.lifecycle.LifecycleOwner;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import com.example.youtube.R;
import com.example.youtube.api.UserAPI;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class UserRepository implements Parcelable {

    public User getLoggedUser() {
        return loggedUser;
    }

    public void setLoggedUser(User loggedUser) {
        this.loggedUser = loggedUser;
    }

    private List<User> users = new ArrayList<>();
    private MutableLiveData<List<UserJson>> usersLiveData = new MutableLiveData<>();
    private User loggedUser;
    private UserListData userListData;

    protected UserRepository(Parcel in) {
        users = in.createTypedArrayList(User.CREATOR);
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeTypedList(users);
    }

    @Override
    public int describeContents() {
        return 0;
    }

    public static final Creator<UserRepository> CREATOR = new Creator<UserRepository>() {
        @Override
        public UserRepository createFromParcel(Parcel in) {
            return new UserRepository(in);
        }

        @Override
        public UserRepository[] newArray(int size) {
            return new UserRepository[size];
        }
    };


    public UserRepository() {
        this.userListData = new UserListData();
    }

    public MutableLiveData<List<UserJson>> getUsersLiveData() {
        return this.usersLiveData;
    }


    class UserListData extends MutableLiveData<List<UserJson>> implements Serializable{
        private UserAPI userAPI;

        public UserListData() {
            super();
            setValue(new ArrayList<>()); // Initialize with an empty list
            userAPI = new UserAPI();
        }

        public void refreshUsers() {
            userAPI.fetchUsers(new Callback<List<UserJson>>() {
                @Override
                public void onResponse(Call<List<UserJson>> call, Response<List<UserJson>> response) {
                    if (response.isSuccessful() && response.body() != null) {
                        usersLiveData.setValue(response.body());
                        Log.d("UserAPI", "Successfully fetched users: " + response.body().toString());
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

        @Override
        protected void onActive() {
            super.onActive();
            refreshUsers();
        }
    }


    public List<User> getUsers() {
        return users;
    }

    public User findUserById(int id) {
        List<User> users = this.users;
        for (User user : users) {
            if (user.getId() == id) {
                return user;
            }
        }
        return null;
    }

}
