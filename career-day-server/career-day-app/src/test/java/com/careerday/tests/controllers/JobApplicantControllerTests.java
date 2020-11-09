package com.careerday.tests.controllers;

import org.junit.jupiter.api.Test;


import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.hamcrest.collection.IsCollectionWithSize.hasSize;


import org.junit.Before;
import org.junit.FixMethodOrder;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
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
class JobApplicantControllerTests {
	
	@Autowired
	private MockMvc mockMvc;
	
	@Autowired
	private WebApplicationContext wac;
	
	@Before
	public void setup() {
		this.mockMvc=MockMvcBuilders.webAppContextSetup(wac).build();
	}
	
	
	@Test
	public void ut1_getAllJobApplicants() throws Exception{
		mockMvc
		   .perform(MockMvcRequestBuilders.get("/api/v1/job-applicants").accept(MediaType.APPLICATION_JSON))
		   .andExpect(status().isOk())
		   .andExpect(jsonPath("$",hasSize(1)))
		   .andDo(print());
	}
	
	@Test
	public void ut2_getJobApplicantsById() throws Exception{
		mockMvc
		    .perform(MockMvcRequestBuilders.get("/api/v1/job-applicants/1").accept(MediaType.APPLICATION_JSON))
		    .andExpect(status().isOk())
		    .andExpect(jsonPath("$.FirstName").exists())
			.andExpect(jsonPath("$.Email").exists())
			.andExpect(jsonPath("$.LastName").exists())
			.andExpect(jsonPath("$.Education").exists())
		    .andDo(print());
		    
	}
	
	@Test
	public void ut3_getJobApplicantByInvalidId() throws Exception{
		mockMvc
		  .perform(MockMvcRequestBuilders.get("/api/v1/job-applicants/17").accept(MediaType.APPLICATION_JSON))
		  .andExpect(status().isNotFound())
		  .andExpect(jsonPath("$.success").value("false"))
		  .andExpect(jsonPath("$.message").exists())
		  .andDo(print());
	}
	
	@Test
	public void ut4_createJob() throws Exception{
		mockMvc
		  .perform(MockMvcRequestBuilders.post("/api/v1/job-applicants")
				  .contentType(MediaType.APPLICATION_JSON)
				  .content("{\"firstName\":\"Miriam\",\"lastName\":\"Nyoks\",\"email\":\"miriamhawks2@mm1.com\",\"levelOfEducation\":\"POST_GRADUATE\",\"yearsOfExperience\":\"9\",\"phone\":\"0712400896\"}")
				  .accept(MediaType.APPLICATION_JSON))
		  .andExpect(status().isCreated())
		  .andExpect(jsonPath("$.FirstName").exists())
		  .andExpect(jsonPath("$.ApplicantId").exists())
		  .andExpect(jsonPath("$.LastName").exists())
		  .andExpect(jsonPath("$.Email").exists())
		  .andExpect(jsonPath("$.Education").exists())
		  .andDo(print());
		          
	}
	
	
	@Test
	public void ut5_createJobDuplicate() throws Exception{
		mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/job-applicants")
			   .contentType(MediaType.APPLICATION_JSON)
			   .content("{\"firstName\":\"Miriam\",\"lastName\":\"Nyoks\",\"email\":\"miriamhawks2@mm1.com\",\"levelOfEducation\":\"POST_GRADUATE\",\"yearsOfExperience\":\"9\",\"phone\":\"0712400896\"}")
			   .accept(MediaType.APPLICATION_JSON))
		   .andExpect(status().isConflict())
		   .andExpect(jsonPath("$.success").value("false"))
		   .andExpect(jsonPath("$.message").exists())
		   .andDo(print());
	}
	
	
	/*@Test
	public void ut6_beleteJobSuccessful() throws Exception{
		mockMvc
		    .perform(MockMvcRequestBuilders.delete("/api/v1/job-applicants/1").accept(MediaType.APPLICATION_JSON))
		    .andExpect(status().isOk())
		    .andExpect(jsonPath("$.success").value("true"))
		    .andExpect(jsonPath("$.message").exists())
		    .andDo(print());
	}*/
}

