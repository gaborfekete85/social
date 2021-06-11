package com.booking.bookingservice.security;


import com.booking.bookingservice.model.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by gabor.fekete85@gmail.com on 02/08/17.
 */

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) {
        throw new UnsupportedOperationException();
    }

    @Transactional
    public UserDetails loadUserByUser(User user) {
        return UserPrincipal.create(user);
    }
}