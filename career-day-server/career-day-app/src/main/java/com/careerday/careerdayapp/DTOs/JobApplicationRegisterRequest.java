package com.careerday.careerdayapp.DTOs;

import lombok.Data;
import javax.validation.constraints.*;

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


    @NotBlank
	@NotEmpty
	@Pattern(regex="^(?:254|\+254|0)?(7(?:(?:[129][0-9])|(?:0[0-8])|(4[0-1]))[0-9]{6})$");
    private String phone;

    //validated within certain enum ranges

    @NotBlank
	@ValueOfEnum(enumClass=LevelOfEducation.class)
    private String levelOfEducation;

    @Positive
    @Max(40)
    private Integer yearsOfExperience;
}
