package com.careerday.careerdayapp.DTOs;

import lombok.Data;
import javax.validation.constraints.*;

import com.careerday.careerdayapp.Entities.LevelOfEducation;
import com.careerday.careerdayapp.Validation.ValueOfEnum;

@Data
public class JobApplicantRegisterRequest {
    @NotBlank
	@NotEmpty
    @Size(min=2,max=40)
    private String firstName;

    @NotBlank
	@NotEmpty
    @Size(min=2,max=40)
    private String lastName;

    @NotBlank
	@NotEmpty
    @Size(max=40)
    @Email
    private String email;

    @NotEmpty(message = "Phone number is required")
    @Pattern(regexp="^\\(?(\\d{4})\\)?[- ]?(\\d{3})[- ]?(\\d{3})$",
             message="Mobile phone number is invalid")
    private String phone;

    

    @NotBlank
    @ValueOfEnum(enumClass = LevelOfEducation.class, message="Leve of Education must be one of 'GRADUATE','UNDER_GRADUATE, HIGHSCHOOL,UNDER-GRADUATE STUDENT")
    private String levelOfEducation;

    @Positive
    @Max(40)
    private Integer yearsOfExperience;
}
