package com.careerday.careerdayapp.DTOs;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;

import com.careerday.careerdayapp.Entities.JobTypeName;
import com.careerday.careerdayapp.Validation.ValueOfEnum;

import javax.validation.constraints.Future;
import javax.validation.constraints.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class JobCreateRequest {

    @NotEmpty
    @NotBlank
    @Size(min = 5)
    private String name;

    @NotEmpty
    @NotBlank
    @Size(min = 20)
    private String description;

    @NotEmpty
    @NotBlank
    @Size(min = 5, max = 150)
    private String summary;

    @NotNull
    @Future
    private LocalDate interviewDate;

   @NotNull
    private LocalTime startTime;
 
    @NotNull
    private LocalTime endTime;
	
	@NotEmpty
	@NotBlank
	@ValueOfEnum(enumClass=JobTypeName.class, message="Job type must a valid selection from the list")
	private String jobType;

}
