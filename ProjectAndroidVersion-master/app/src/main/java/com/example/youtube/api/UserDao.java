package com.example.youtube.api;

import com.example.youtube.utilities.User;
import androidx.room.Dao;
import androidx.room.Delete;
import androidx.room.Insert;
import androidx.room.Query;

import java.util.List;

@Dao
public interface UserDao {
    @Query("SELECT * FROM users")
    List<User> getUsers();

    @Query("SELECT * FROM users WHERE id IN (:userIds)")
    List<User> loadAllByIds(int[] userIds);

    @Query("SELECT * FROM users WHERE userName LIKE :userName AND " +
            "userPassword LIKE :password LIMIT 1")
    User findByName(String userName, String password);

    @Insert
    void insertAll(User... users);

    @Delete
    void delete(User user);
}
