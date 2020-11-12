package com.careerday.careerdayapp.Controllers;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.careerday.careerdayapp.DTOs.AuthenticationResponse;
import com.careerday.careerdayapp.DTOs.LoginRequest;
import com.careerday.careerdayapp.Services.IAuthService;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
  
    private final IAuthService authService;
    
    public AuthController(IAuthService authService) {
    	this.authService=authService;
    }
   
    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
         AuthenticationResponse response=authService.authenticate(loginRequest);
         return new ResponseEntity<>(response,HttpStatus.OK);           
    }

    
}
