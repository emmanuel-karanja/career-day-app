package com.careerday.careerdayapp.Services;

import com.careerday.careerdayapp.DTOs.AvailabilityResponse;
import com.careerday.careerdayapp.DTOs.UserRegisterRequest;
import com.careerday.careerdayapp.DTOs.UserResponse;

public interface IUserService {   
    UserResponse register(UserRegisterRequest registerRequest);
    UserResponse findUserByEmail(String email);
    AvailabilityResponse existsByEmail(String email);
}