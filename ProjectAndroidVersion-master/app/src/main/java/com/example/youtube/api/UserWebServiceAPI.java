package com.example.youtube.api;

import com.example.youtube.utilities.UserJson;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Path;

public interface UserWebServiceAPI {
    @GET("users")
    Call <List<UserJson>> getUsers();

    @POST("users")
    Call<Void> createUser(@Body UserJson user);

    @DELETE("posts/{id}")
    Call<Void> deletePost(@Path("id") int id);

}
