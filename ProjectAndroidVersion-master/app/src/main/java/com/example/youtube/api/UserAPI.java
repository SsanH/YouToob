package com.example.youtube.api;

import com.example.youtube.utilities.User;
import com.example.youtube.utilities.UserJson;

import java.io.Serializable;
import java.util.List;

import retrofit2.Retrofit;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.converter.gson.GsonConverterFactory;

public class UserAPI implements Serializable {

    private Retrofit retrofit;
    private UserWebServiceAPI userWebServiceAPI;
    private List<User> users;

    public UserWebServiceAPI getUserWebServiceAPI() {
        return userWebServiceAPI;
    }

    public UserAPI() {
        retrofit = new Retrofit.Builder()
                .baseUrl("http://10.0.2.2:12345/")
                .addConverterFactory(GsonConverterFactory.create())
                .build();
        userWebServiceAPI = retrofit.create(UserWebServiceAPI.class);
    }


    public void fetchUsers(Callback<List<UserJson>> callback) {
        Call<List<UserJson>> call = userWebServiceAPI.getUsers();
        call.enqueue(callback);
    }

    public void createUser(UserJson user, Callback<Void> callback) {
        Call<Void> call = userWebServiceAPI.createUser(user);
        call.enqueue(callback);
    }

}
