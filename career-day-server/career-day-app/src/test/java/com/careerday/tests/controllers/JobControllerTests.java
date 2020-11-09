package com.careerday.tests.controllers;

import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import com.careerday.careerdayapp.Entities.Job;
import com.careerday.careerdayapp.Entities.JobTypeName;
import com.careerday.careerdayapp.Entities.LevelOfEducation;
import com.careerday.careerdayapp.Services.JobService;
import com.fasterxml.jackson.databind.ObjectMapper;

class JobControllerTests {
	
	@Autowired
	private MockMvc mockMvc;
	
	@MockBean
	private JobService jobService;
	
	@Autowired
	private ObjectMapper objectMapper;
	
	private List<Job> jobList;

	@BeforeEach
	void setUp() throws Exception {
		final Job job=new Job();
		job.setName("UI Dude");
		job.setDescription("We want a front-end ninja with at least 3 years experience in React and Redux");
		job.setSummary("Front-end Ninja wanted");
		job.setInterviewAt(LocalDate.of(2020, 12, 21));
		job.setInterviewStartTime(LocalTime.of(10, 00));
		job.setInterviewEndTime(LocalTime.of(17, 00));
		job.setLevelOfEducation(LevelOfEducation.GRADUATE);
		job.setType(JobTypeName.UI_ENGINEER);
		
		final Job job1=new Job();
		job1.setName("API Guy");
		job1.setDescription("We want a front-end ninja with at least 3 years experience in React and Redux");
		job1.setSummary("Front-end Ninja wanted");
		job1.setInterviewAt(LocalDate.of(2020, 12, 12));
		job1.setInterviewStartTime(LocalTime.of(10, 00));
		job1.setInterviewEndTime(LocalTime.of(17, 00));
		job1.setLevelOfEducation(LevelOfEducation.POST_GRADUATE);
		job1.setType(JobTypeName.API_ENGINEER);
		
		this.jobList=new ArrayList<>();
		
		this.jobList.add(job);
		this.jobList.add(job1);
		
		
		
	}

	@Test
	void test() {
		fail("Not yet implemented");
	}

}
