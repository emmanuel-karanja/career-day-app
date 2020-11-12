package com.careerday.careerdayapp.Controllers;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.careerday.careerdayapp.DTOs.AvailabilityResponse;
import com.careerday.careerdayapp.DTOs.EmailRequest;
import com.careerday.careerdayapp.DTOs.UserRegisterRequest;
import com.careerday.careerdayapp.DTOs.UserResponse;
import com.careerday.careerdayapp.Services.IUserService;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

	private final IUserService userService;
	public UserController(IUserService userService) {
		this.userService=userService;
	}
	
	@PostMapping("/register")
    public ResponseEntity<UserResponse> registerUser(@Valid @RequestBody UserRegisterRequest registerRequest) {
        UserResponse response=userService.register(registerRequest);
        return new ResponseEntity<>(response,HttpStatus.CREATED);
    }
	
	@GetMapping("/email-available")
	   public ResponseEntity<AvailabilityResponse> checkEmailAvailability(@Valid @RequestBody EmailRequest request){
		   AvailabilityResponse response=userService.existsByEmail(request.getEmail());
		   
		   return new ResponseEntity<>(response,HttpStatus.OK);
	 }
	
	@GetMapping("/{email}")
	public ResponseEntity<UserResponse> getUserByEmail(@PathVariable(value="email") String email){
		UserResponse response=userService.findUserByEmail(email);
		return new ResponseEntity<>(response,HttpStatus.OK);
	}
}
