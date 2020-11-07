package com.careerday.careerdayapp.DTOs;

import javax.validation.constraints.*;

import com.careerday.careerdayapp.Entities.LevelOfEducation;
import com.careerday.careerdayapp.ValidationUtils.ValueOfEnum;

import lombok.Data;

//the email is a unique identifier in the db and it's never updated
@Data
public class JobApplicantUpdateRequest {
    @NotBlank
    @Size(min = 2, max = 40)
    private String firstName;

    @NotBlank
    @Size(min = 2, max = 40)
    private String lastName;

    // we need some regexp for phone number. Validates Kenyan numbers for now
    @NotBlank
	@Pattern(regex="^(?:254|\+254|0)?(7(?:(?:[129][0-9])|(?:0[0-8])|(4[0-1]))[0-9]{6})$");
    private String phone;

    // validated within certain enum ranges
    @ValueOfEnum(enumClass = LevelOfEducation.class)
    private String levelOfEducation;
	
	@NotBlank
	@Positive
	@Max(40)
	private Integer yearsOfExperience;
	
}
