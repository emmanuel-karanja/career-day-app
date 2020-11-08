package com.careerday.careerdayapp.DTOs;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

import lombok.Data;

@Data
public class EmailRequest {

	@NotEmpty
	@Email
	private String email;
}
