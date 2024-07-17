package com.example.youtube.utilities;

import android.app.Application;
import android.content.Context;

import com.example.youtube.R;

import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class MyApplication extends Application {

    public static Context context;
    private static Retrofit retrofit;

    @Override
    public void onCreate() {
        super.onCreate();
        context = getApplicationContext();
        initRetrofit();
    }

    private void initRetrofit() {
        retrofit = new Retrofit.Builder()
                .baseUrl(context.getString(R.string.BaseURLUsers)) // Example URL (default)
                .addConverterFactory(GsonConverterFactory.create())
                .build();
    }

    public static Retrofit getRetrofitInstance() {
        return retrofit;
    }
}
