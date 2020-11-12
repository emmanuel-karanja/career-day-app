package com.careerday.careerdayapp.Services;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.careerday.careerdayapp.DTOs.AuthenticationResponse;
import com.careerday.careerdayapp.DTOs.AvailabilityResponse;
import com.careerday.careerdayapp.DTOs.LoginRequest;
import com.careerday.careerdayapp.DTOs.UserRegisterRequest;
import com.careerday.careerdayapp.DTOs.UserResponse;
import com.careerday.careerdayapp.Entities.Role;
import com.careerday.careerdayapp.Entities.RoleName;
import com.careerday.careerdayapp.Entities.User;
import com.careerday.careerdayapp.Exceptions.AppException;
import com.careerday.careerdayapp.Exceptions.ResourceNotFoundException;
import com.careerday.careerdayapp.Repositories.RoleRepository;
import com.careerday.careerdayapp.Repositories.UserRepository;
import com.careerday.careerdayapp.DTOs.AvailabilityResponse;

@Service
public class UserService implements IUserService {
	
	private final ModelMapper modelMapper;
	private final UserRepository userRepository;
	private final RoleRepository roleRepository;
	private PasswordEncoder passwordEncoder;
	
	public UserService(UserRepository userRepository,
			          RoleRepository roleRepository,
			          ModelMapper modelMapper,
			          PasswordEncoder passwordEncoder) {
		this.userRepository=userRepository;
		this.roleRepository=roleRepository;
		this.modelMapper=modelMapper;
		this.passwordEncoder=passwordEncoder;
	}
	 

	@Override
	public UserResponse register(UserRegisterRequest registerRequest) {
		//for this app(for the sake of simplicity) the first user stored
		//is designated admin
		Long count=userRepository.count();
		Role userRole;
		User user= convertFromDTO(registerRequest);
		List<Role> roles = new ArrayList<>();
		if(count ==0) {		
		   userRole=roleRepository.findByName(RoleName.ADMIN)
				      .orElseThrow(()-> new AppException("User role not set"));
				           ;
			user.setAdmin(true);
		}else {
			userRole=roleRepository.findByName(RoleName.APPLICANT)
					 .orElseThrow(()-> new AppException("User role not set"));
			user.setAdmin(false);
		}
		roles.add(userRole);
		user.setRoles(roles);
		
		User savedUser=userRepository.save(user);
		
		return convertToDTO(savedUser);
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
		
		return user;
	}

	@Override
	public AvailabilityResponse existsByEmail(String email) {
		// TODO Auto-generated method stub
		boolean exists=userRepository.existsByEmail(email);
		return new AvailabilityResponse(!exists);
	}
}
