package com.careerday.careerdayapp.DTOs;

import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class JobResponse {
    private Long id;
    private String name;
    private String type;
    private String summary;
    private String description;
    private LocalDate interviewDate;
    private LocalTime startTime;
    private LocalTime endTime;
}
