package com.careerday.careerdayapp.Controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.careerday.careerdayapp.DTOs.ApiResponse;
import com.careerday.careerdayapp.DTOs.AvailabilityResponse;
import com.careerday.careerdayapp.DTOs.CountResponse;
import com.careerday.careerdayapp.DTOs.EmailRequest;
import com.careerday.careerdayapp.DTOs.JobApplicantRegisterRequest;
import com.careerday.careerdayapp.DTOs.JobApplicantResponse;
import com.careerday.careerdayapp.DTOs.JobApplicantUpdateRequest;
import com.careerday.careerdayapp.DTOs.JobApplicationCreateRequest;
import com.careerday.careerdayapp.DTOs.JobApplicationResponse;
import com.careerday.careerdayapp.DTOs.JobApplicationUpdateRequest;
import com.careerday.careerdayapp.DTOs.PagedResponse;
import com.careerday.careerdayapp.DTOs.PhoneRequest;
import com.careerday.careerdayapp.Services.IJobApplicantService;
import com.careerday.careerdayapp.Utils.AppConstants;

import io.swagger.annotations.Api;

@RestController
@RequestMapping("/api/v1/job-applicants")
@Api(value="Job Applicants and Applications", description="Operations to manage job applicants and applications")
public class JobApplicantController{
	
	private final IJobApplicantService jobApplicantService;
	
	public JobApplicantController(IJobApplicantService jobApplicantService){
		this.jobApplicantService=jobApplicantService;
	}
	
	@GetMapping
	public ResponseEntity<List<JobApplicantResponse>> getAll(){
		List<JobApplicantResponse> response=jobApplicantService.getAllApplicants();
		return new ResponseEntity<>(response,HttpStatus.OK);
	}
		
   @GetMapping("/paged")
	public ResponseEntity<PagedResponse<JobApplicantResponse>> getAll(
	@RequestParam(name="page", required=false,defaultValue= AppConstants.DEFAULT_PAGE_NUMBER) Integer page,
	@RequestParam(name="size",required=false, defaultValue=AppConstants.DEFAULT_PAGE_SIZE) Integer size){
    	
		PagedResponse<JobApplicantResponse> response=jobApplicantService.getAllApplicants(page,size);
		
		return new ResponseEntity<>(response,HttpStatus.OK);
	}
   
   //i can see how this could be dangerous without rate-limiting
   @GetMapping("/email-available")
   public ResponseEntity<AvailabilityResponse> checkEmailAvailability(@Valid @RequestBody EmailRequest request){
	   AvailabilityResponse response=jobApplicantService.checkEmailAvailability(request.getEmail());
	   
	   return new ResponseEntity<>(response,HttpStatus.OK);
   }
	
   @GetMapping("/phone-available")
   public ResponseEntity<AvailabilityResponse> checkPhoneAvailability(@Valid @RequestBody PhoneRequest request){
	   AvailabilityResponse response=jobApplicantService.checkPhoneNumberAvailability(request.getPhone());
	   
	   return new ResponseEntity<>(response,HttpStatus.OK);
   }
   
   @GetMapping("/{id}/applications/count")
   public ResponseEntity<CountResponse> getApplicationCountByApplicant(@PathVariable(value="id") Long id){
	   CountResponse response=jobApplicantService.getApplicationCountByApplicant(id);
	   return new ResponseEntity<>(response,HttpStatus.OK);
   }
	
	@PostMapping
	public ResponseEntity<JobApplicantResponse> addJobApplicant(@Valid @RequestBody JobApplicantRegisterRequest request){
		JobApplicantResponse response=jobApplicantService.create(request);
		
		return new ResponseEntity<>(response,HttpStatus.CREATED);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<JobApplicantResponse> getApplicant(@PathVariable(value="id") Long id){
	   JobApplicantResponse response=jobApplicantService.getById(id);
       return new ResponseEntity<>(response,HttpStatus.OK);	   
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<JobApplicantResponse> updateApplicant(@PathVariable(value="id") Long id, 
	        @Valid @RequestBody JobApplicantUpdateRequest request){
				JobApplicantResponse response=jobApplicantService.update(id,request);
				return new ResponseEntity<>(response,HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<ApiResponse> deleteApplicant(@PathVariable(value="id") Long id){
		ApiResponse response=jobApplicantService.delete(id);
		return new ResponseEntity<>(response,HttpStatus.OK);
	}
	
	@GetMapping("/{id}/applications")
	public ResponseEntity<List<JobApplicationResponse>> getApplications(@PathVariable(value="id") Long id){
		List<JobApplicationResponse> response=jobApplicantService.getAllApplications(id);
		return new ResponseEntity<>(response, HttpStatus.OK);
		
	}
	
	
	@GetMapping("/{id}/applications/{applicationId}")
	public ResponseEntity<JobApplicationResponse> getApplication(@PathVariable(value="id") Long id, 
	@PathVariable(value="applicationId") Long applicationId){
		JobApplicationResponse response=jobApplicantService.getApplication(id,applicationId);
		return new ResponseEntity<>(response,HttpStatus.OK);
	}
	
	@PostMapping("/{id}/applications")
	public ResponseEntity<JobApplicationResponse> addApplication(@PathVariable(value="id") Long id,
	@Valid @RequestBody JobApplicationCreateRequest request){
		JobApplicationResponse response=jobApplicantService.createApplication(id,request);
		return new ResponseEntity<>(response,HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}/applications/{applicationId}")
	public ResponseEntity<ApiResponse> deleteApplication(@PathVariable(value="id") Long id,
	@PathVariable(value="applicationId") Long applicationId){
		ApiResponse response=jobApplicantService.deleteApplication(id,applicationId);
		return new ResponseEntity<>(response,HttpStatus.OK);
	}
	
	@PutMapping("/{id}/applications/{applicationId}")
	public ResponseEntity<JobApplicationResponse> updateApplication(@PathVariable(value="id") Long id,
	@PathVariable(value="applicationId") Long applicationId,
	@Valid @RequestBody JobApplicationUpdateRequest request){
		JobApplicationResponse response=jobApplicantService.updateApplication(id,applicationId,request);
		
		return new ResponseEntity<>(response,HttpStatus.OK);
	}	
}