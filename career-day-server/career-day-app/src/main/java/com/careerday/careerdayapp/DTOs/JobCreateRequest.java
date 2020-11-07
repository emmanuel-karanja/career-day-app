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

    @NotEmpty
    @NotBlank
    @Future
    private LocalDate interviewDate;

    @NotEmpty
    @NotBlank
    private LocalTime startTime;

    @NotEmpty
    @NotBlank
    private LocalTime endTime;
	
	@NotEmpty
	@NotBlank
	@ValueOfEnum(enumClass=JobTypeName.class)
	private String jobType;

}
