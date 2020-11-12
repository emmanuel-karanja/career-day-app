package com.careerday.careerdayapp.DTOs;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;

@Getter
@Setter
@Accessors(chain = true)
@NoArgsConstructor
@ToString
public class AuthenticationResponse {
	 private String email;
	 private String firstName;
	 private String lastName;
	 private boolean isAdmin;
	 private String jwtToken;
}
