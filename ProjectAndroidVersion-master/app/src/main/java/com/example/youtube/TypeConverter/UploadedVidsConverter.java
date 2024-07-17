package com.example.youtube.TypeConverter;

import androidx.room.TypeConverter;

public class UploadedVidsConverter {
    @TypeConverter
    public static String fromArray(int[] uploadedVids) {
        if (uploadedVids == null) {
            return null;
        }
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < uploadedVids.length; i++) {
            sb.append(uploadedVids[i]);
            if (i < uploadedVids.length - 1) {
                sb.append(",");
            }
        }
        return sb.toString();
    }

    @TypeConverter
    public static int[] toArray(String uploadedVids) {
        if (uploadedVids == null) {
            return null;
        }
        String[] strings = uploadedVids.split(",");
        int[] result = new int[strings.length];
        for (int i = 0; i < strings.length; i++) {
            result[i] = Integer.parseInt(strings[i].trim());
        }
        return result;
    }
}
