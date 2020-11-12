package com.careerday.careerdayapp.Services;

import java.util.Arrays;
import java.util.HashSet;

import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.careerday.careerdayapp.DTOs.AuthenticationResponse;
import com.careerday.careerdayapp.DTOs.AvailabilityResponse;
import com.careerday.careerdayapp.DTOs.LoginRequest;
import com.careerday.careerdayapp.DTOs.UserRegisterRequest;
import com.careerday.careerdayapp.DTOs.UserResponse;
import com.careerday.careerdayapp.Entities.Role;
import com.careerday.careerdayapp.Entities.RoleName;
import com.careerday.careerdayapp.Entities.User;
import com.careerday.careerdayapp.Exceptions.ResourceNotFoundException;
import com.careerday.careerdayapp.Repositories.RoleRepository;
import com.careerday.careerdayapp.Repositories.UserRepository;
import com.careerday.careerdayapp.DTOs.AvailabilityResponse;

@Service
public class UserService implements IUserService {
	
	private final ModelMapper modelMapper;
	private final UserRepository userRepository;
	private final RoleRepository roleRepository;
	private BCryptPasswordEncoder passwordEncoder;
	
	public UserService(UserRepository userRepository,
			          RoleRepository roleRepository,
			          ModelMapper modelMapper) {
		this.userRepository=userRepository;
		this.roleRepository=roleRepository;
		this.modelMapper=modelMapper;
	}
	 

	@Override
	public UserResponse register(UserRegisterRequest registerRequest) {
		//for this app(for the sake of simplicity) the first user stored
		//is designated admin
		Long count=userRepository.count();
		Role userRole;
		User user= convertFromDTO(registerRequest);
		if(count ==0) {		
		   userRole=roleRepository.findByRoleName(RoleName.ADMIN);
			user.setAdmin(true);
		}else {
			userRole=roleRepository.findByRoleName(RoleName.APPLICANT);
			user.setAdmin(false);
		}
		user.setRoles(new HashSet<>(Arrays.asList(userRole)));
		
		User savedUser=userRepository.save(user);
		
		return convertToDTO(user);
	}

	@Override
	public UserResponse findUserByEmail(String email) {
		User user=userRepository.findByEmail(email)
				        .orElseThrow(()-> new ResourceNotFoundException("User","email",email));
		return convertToDTO(user);	
	}
	
	
	
	private UserResponse convertToDTO(User user) {
		return modelMapper.map(user, UserResponse.class);
	}

	private User convertFromDTO(UserRegisterRequest request) {
		User user=new User();
		user.setEmail(request.getEmail());
		user.setFirstName(request.getFirstName());
		user.setLastName(request.getLastName());
		user.setPassword(passwordEncoder.encode(request.getPassword()));
		user.setPhone(request.getPhone());
		
	}

	@Override
	public AvailabilityResponse existsByEmail(String email) {
		// TODO Auto-generated method stub
		boolean exists=userRepository.existsByEmail(email);
		return new AvailabilityResponse(!exists);
	}
}
