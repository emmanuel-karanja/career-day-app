package com.careerday.careerdayapp.DTOs;

import javax.validation.constraints.*;

import com.careerday.careerdayapp.Entities.LevelOfEducation;
import com.careerday.careerdayapp.Validation.ValueOfEnum;

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

    @NotEmpty
    @ValueOfEnum(enumClass = LevelOfEducation.class, message="Leve of Education must be one of 'GRADUATE','UNDER_GRADUATE, HIGHSCHOOL,UNDER-GRADUATE STUDENT")
    private String levelOfEducation;
	
	@NotNull
	@Positive
	@Max(40)
	private Integer yearsOfExperience;
	
}
