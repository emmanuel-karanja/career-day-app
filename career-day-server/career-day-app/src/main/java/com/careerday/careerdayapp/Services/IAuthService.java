package com.careerday.careerdayapp.Services;

import com.careerday.careerdayapp.DTOs.AuthenticationResponse;
import com.careerday.careerdayapp.DTOs.LoginRequest;

public interface IAuthService {
  AuthenticationResponse authenticate(LoginRequest loginRequest);
}
