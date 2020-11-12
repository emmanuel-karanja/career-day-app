package com.careerday.careerdayapp.Services;

public interface IAuthService {
  AuthenticationResponse authenticate(LoginRequest loginRequest);
}
