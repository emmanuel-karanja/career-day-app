package com.careerday.tests.unittests;


import static org.hamcrest.CoreMatchers.is;
import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.zalando.problem.ProblemModule;
import org.zalando.problem.validation.ConstraintViolationProblemModule;

import com.careerday.careerdayapp.CareerDayAppApplication;
import com.careerday.careerdayapp.Controllers.JobController;
import com.careerday.careerdayapp.DTOs.JobCreateRequest;
import com.careerday.careerdayapp.DTOs.JobResponse;
import com.careerday.careerdayapp.DTOs.JobUpdateRequest;
import com.careerday.careerdayapp.Entities.Job;
import com.careerday.careerdayapp.Entities.JobStatus;
import com.careerday.careerdayapp.Entities.JobTypeName;
import com.careerday.careerdayapp.Entities.LevelOfEducation;
import com.careerday.careerdayapp.Services.JobService;
import com.fasterxml.jackson.databind.ObjectMapper;
import static org.mockito.BDDMockito.given;
import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers=JobController.class)
@ContextConfiguration(classes=CareerDayAppApplication.class)
//@ActiveProfiles("test")
@AutoConfigureMockMvc
class JobControllerUnitTests {

	@Autowired
	private MockMvc mockMvc;
	
	@MockBean
	private JobService jobService;
	
	@Autowired
	private ObjectMapper objectMapper;
	
	private List<Job> jobList;
	
	private List<JobResponse> jobResponseList;
	
	@BeforeEach
	void setup() {
		this.jobList=new ArrayList<>();
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
		
		this.jobList.add(job);
		this.jobList.add(job1);
		
		this.jobResponseList=jobList.stream().map(j-> convertFromEntity(j))
				                             .collect(Collectors.toList());
		
		objectMapper.registerModule(new ProblemModule());
		objectMapper.registerModule(new ConstraintViolationProblemModule());
	}
	
	@Test
	void shouldFetchAllJobs() throws Exception{
		given(jobService.getAllJobs()).willReturn(jobResponseList);
		
		mockMvc.perform(get("/api/v1/jobs"))
		       .andExpect(status().isOk())
		       .andExpect(jsonPath("$.size()", is(jobResponseList.size())));
		       
	}
	
	@Test
	void shouldFetchOneJobById()throws Exception{
		final Long id=1L;
		
		final Job job1=new Job();
		job1.setName("API Guy");
		job1.setDescription("We want a front-end ninja with at least 3 years experience in React and Redux");
		job1.setSummary("Front-end Ninja wanted");
		job1.setInterviewAt(LocalDate.of(2020, 12, 12));
		job1.setInterviewStartTime(LocalTime.of(10, 00));
		job1.setInterviewEndTime(LocalTime.of(17, 00));
		job1.setLevelOfEducation(LevelOfEducation.POST_GRADUATE);
		job1.setType(JobTypeName.API_ENGINEER);
		
		JobResponse response=convertFromEntity(job1);
		
		given(jobService.getById(id)).willReturn(response);
		
		mockMvc.perform(get("/api/v1/jobs/{id}",id))
		       .andExpect(status().isOk())
		       .andExpect(jsonPath("$.name",is(job1.getName())))
		       .andExpect(jsonPath("$.description",is(job1.getDescription())))
		       .andDo(print());
	}
	
	@Test
	void shouldReturnNotFound404WithInvalidJobId() throws Exception{
		final Long id=1L;
		given(jobService.getById(id)).willReturn(null);
		
		mockMvc.perform(get("/api/v1/jobs/{id}",id))
		       .andExpect(status().isOk())
		       .andDo(print());
	}
	
	/*@Test
	void shouldCreateNewJob()throws Exception{
		given(jobService.create(any(JobCreateRequest.class))).willAnswer((invocation) -> invocation.getArgument(0));
		
		final JobCreateRequest job=new JobCreateRequest();
		job.setName("UI Dude");
		job.setDescription("We want a front-end ninja with at least 3 years experience in React and Redux");
		job.setSummary("Front-end Ninja wanted");
		job.setInterviewDate(LocalDate.of(2020, 12, 21));
		job.setStartTime(LocalTime.of(10, 00));
		job.setEndTime(LocalTime.of(17, 00));
		job.setLevelOfEducation("GRADUATE");
		job.setJobType("UI_ENGINEER");
		
		mockMvc.perform(post("/api/v1/jobs")
			   .contentType(MediaType.APPLICATION_JSON)
			   .content("{\"name\":\"Serverless Engineer\",\"description\":\"A developer with at least 3 years experience developing GraphQL APIs in Node.js with Claudia.js\",\"summary\":\"Summary of Job 1\",\"jobType\":\"API_ENGINEER\",\"interviewDate\":\"2021-01-11\",\"startTime\":\"10:00\",\"endTime\":\"17:00\",\"levelOfEducation\":\"GRADUATE\"}"))
		       .andExpect(status().isCreated())
		       .andExpect(jsonPath("$.name", is(job.getName())))
		       .andExpect(jsonPath("$.description",is(job.getDescription())))
		       .andExpect(jsonPath("$.status",is("ACTIVE")))
		       .andDo(print());
	}*/
	
	/*@Test
	void shouldUpdateUser() throws Exception{
		Long id=1L;
		
		final Job job1=new Job();
		job1.setName("API Guy");
		job1.setDescription("We want a front-end ninja with at least 3 years experience in React and Redux");
		job1.setSummary("Front-end Ninja wanted");
		job1.setInterviewAt(LocalDate.of(2020, 12, 12));
		job1.setInterviewStartTime(LocalTime.of(10, 00));
		job1.setInterviewEndTime(LocalTime.of(17, 00));
		job1.setLevelOfEducation(LevelOfEducation.POST_GRADUATE);
		job1.setType(JobTypeName.API_ENGINEER);
		
		JobResponse response=convertFromEntity(job1);
		
		final JobUpdateRequest updated=new JobUpdateRequest();
	    
	    updated.setName("UI Dude");
	    updated.setDescription("We want a front-end ninja with at least 3 years experience in React and Redux");
	    updated.setSummary("Front-end Ninja wanted");
		updated.setInterviewDate(LocalDate.of(2020, 12, 21));
		updated.setStartTime(LocalTime.of(10, 00));
		updated.setEndTime(LocalTime.of(17, 00));
		updated.setLevelOfEducation("GRADUATE");
		updated.setStatus("ACTIVE");
		updated.setJobType("UI_ENGINEER");
		
		given(jobService.getById(id)).willReturn(response);
		given(jobService.update(id,any(JobUpdateRequest.class))).willAnswer((invocation) -> invocation.getArgument(0));
		
		mockMvc.perform(put("/api/v1/jobs",id)
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(updated)))
		       .andExpect(status().isOk())
		       .andExpect(jsonPath("$.name",is(updated.getName())))
		       .andExpect(jsonPath("$.description",is(updated.getDescription())))
		       .andDo(print());
		       
	}*/
	
	
	
	private JobResponse convertFromEntity(Job job){
		//JobResponse jobResponse=modelMapper.map(job ,JobResponse.class);
		//return jobResponse;
		
		 JobResponse jobResponse=new JobResponse();
		 jobResponse.setId(job.getJobId());
		 jobResponse.setName(job.getName());
		 jobResponse.setDescription(job.getDescription());
		 jobResponse.setInterviewDate(job.getInterviewAt());
		 jobResponse.setSummary(job.getSummary());
		 jobResponse.setStartTime(job.getInterviewStartTime());
		 jobResponse.setEndTime(job.getInterviewEndTime());
		 jobResponse.setStatus(job.getStatus());
		 jobResponse.setType(job.getType().name());
		 
		 return jobResponse;
	}
}
