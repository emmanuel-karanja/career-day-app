package com.careerday.careerdayapp.DTOs;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;

import lombok.Data;

@Data
public class PhoneRequest {
 
	@NotEmpty
	@Pattern(regexp="^\\(?(\\d{4})\\)?[- ]?(\\d{3})[- ]?(\\d{3})$",
    message="Mobile phone number is invalid")
	private String phone;
}
