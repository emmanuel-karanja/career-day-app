package com.careerday.tests.controllers;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.hamcrest.collection.IsCollectionWithSize.hasSize;


import org.junit.Before;
import org.junit.FixMethodOrder;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.annotation.Order;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.careerday.careerdayapp.CareerDayAppApplication;
import org.junit.runners.MethodSorters;

@RunWith(SpringRunner.class)
@TestPropertySource(
		  locations = "classpath:application-integrationtest.properties")
@ContextConfiguration(classes=CareerDayAppApplication.class)
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
@AutoConfigureMockMvc
@SpringBootTest
class JobControllerTests {
	
	@Autowired
	private MockMvc mockMvc;
	
	@Autowired
	private WebApplicationContext wac;
	
	@Before
	public void setup() {
		this.mockMvc=MockMvcBuilders.webAppContextSetup(wac).build();
	}
	/*@Test
	public void a_releteJobSuccessful() throws Exception{
		mockMvc
		    .perform(MockMvcRequestBuilders.delete("/api/v1/jobs/1").accept(MediaType.APPLICATION_JSON))
		    .andExpect(status().isOk())
		    .andExpect(jsonPath("$.success").value("true"))
		    .andExpect(jsonPath("$.message").exists())
		    .andDo(print());
	}*/
	
	@Test
	public void getAllJobs() throws Exception{
		mockMvc
		   .perform(MockMvcRequestBuilders.get("/api/v1/jobs").accept(MediaType.APPLICATION_JSON))
		   .andExpect(status().isOk())
		   .andExpect(jsonPath("$",hasSize(1)))
		   .andDo(print());
	}
	
	@Test
	public void getJobById() throws Exception{
		mockMvc
		    .perform(MockMvcRequestBuilders.get("/api/v1/jobs/1").accept(MediaType.APPLICATION_JSON))
		    .andExpect(status().isOk())
		    .andExpect(jsonPath("$.name").exists())
			.andExpect(jsonPath("$.status").exists())
			.andExpect(jsonPath("$.summary").exists())
			.andExpect(jsonPath("$.type").exists())
		    .andDo(print());
		    
	}
	
	@Test
	public void getJobByInvalidId() throws Exception{
		mockMvc
		  .perform(MockMvcRequestBuilders.get("/api/v1/jobs/17").accept(MediaType.APPLICATION_JSON))
		  .andExpect(status().isNotFound())
		  .andExpect(jsonPath("$.success").value("false"))
		  .andExpect(jsonPath("$.message").exists())
		  .andDo(print());
	}
	
	@Test
	public void ZZ_createJob() throws Exception{
		mockMvc
		  .perform(MockMvcRequestBuilders.post("/api/v1/jobs")
				  .contentType(MediaType.APPLICATION_JSON)
				  .content("{\"name\":\"Serverless Engineer\",\"description\":\"A developer with at least 3 years experience developing GraphQL APIs in Node.js with Claudia.js\",\"summary\":\"Summary of Job 1\",\"jobType\":\"API_ENGINEER\",\"interviewDate\":\"2021-01-11\",\"startTime\":\"10:00\",\"endTime\":\"17:00\",\"levelOfEducation\":\"GRADUATE\"}")
				  .accept(MediaType.APPLICATION_JSON))
		  .andExpect(status().isCreated())
		  .andExpect(jsonPath("$.name").exists())
		  .andExpect(jsonPath("$.status").exists())
		  .andExpect(jsonPath("$.summary").exists())
		  .andExpect(jsonPath("$.type").exists())
		  .andDo(print());
		          
	}
	
	
	@Test
	public void aa_createJobDuplicate() throws Exception{
		mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/jobs")
			   .contentType(MediaType.APPLICATION_JSON)
			   .content("{\"name\":\"Serverless Engineer\",\"description\":\"A developer with at least 3 years experience developing GraphQL APIs in Node.js with Claudia.js\",\"summary\":\"Summary of Job 1\",\"jobType\":\"API_ENGINEER\",\"interviewDate\":\"2021-01-11\",\"startTime\":\"10:00\",\"endTime\":\"17:00\",\"levelOfEducation\":\"GRADUATE\"}")
			   .accept(MediaType.APPLICATION_JSON))
		   .andExpect(status().isConflict())
		   .andExpect(jsonPath("$.success").value("false"))
		   .andExpect(jsonPath("$.message").exists())
		   .andDo(print());
	}
	
	
	
}
