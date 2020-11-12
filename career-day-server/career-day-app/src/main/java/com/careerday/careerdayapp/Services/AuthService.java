package com.careerday.careerdayapp.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.careerday.careerdayapp.DTOs.AuthenticationResponse;
import com.careerday.careerdayapp.DTOs.LoginRequest;
import com.careerday.careerdayapp.Entities.User;
import com.careerday.careerdayapp.Exceptions.ResourceNotFoundException;
import com.careerday.careerdayapp.Repositories.RoleRepository;
import com.careerday.careerdayapp.Repositories.UserRepository;
import com.careerday.careerdayapp.Security.JwtTokenProvider;

@Service
public class AuthService implements IAuthService{
	@Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;


    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider tokenProvider;

	@Override
	public AuthenticationResponse authenticate(LoginRequest loginRequest) {
		User user=userRepository.findByEmail(loginRequest.getEmail())
				      .orElseThrow(()-> new ResourceNotFoundException("User","Email",loginRequest.getEmail()));
		Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
       
        
        String jwt = tokenProvider.generateToken(authentication);
        
        AuthenticationResponse response=new AuthenticationResponse();
        response.setEmail(user.getEmail());
        response.setFirstName(user.getFirstName());
        response.setLastName(user.getLastName());
        response.setAdmin(user.isAdmin());
        response.setJwtToken(jwt);
        
        return response;
        
	}

}
