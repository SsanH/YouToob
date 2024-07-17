package com.example.youtube.TypeConverter;

import android.content.Context;
import android.net.Uri;
import androidx.room.TypeConverter;

import com.example.youtube.R;

public class UriConverter {
    private static Context context;
    @TypeConverter
    public static String fromUri(Uri uri) {
        if (uri == null) {
            return null;
        }
        return uri.toString();
    }

    @TypeConverter
    public static Uri toUri(String uriString) {
        int imgResId = context.getResources().getIdentifier(uriString, "drawable", context.getPackageName());

        if (imgResId == 0) {
            return Uri.parse("android.resource://" + context.getPackageName() + "/" + R.drawable.def);
        }

        if (imgResId != 0){
            return Uri.parse("android.resource://" + context.getPackageName() + "/" + imgResId);
        }

        return Uri.parse(uriString);
    }
}

