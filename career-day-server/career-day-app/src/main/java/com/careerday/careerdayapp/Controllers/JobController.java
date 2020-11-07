package com.careerday.careerdayapp.Controllers;

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
import com.careerday.careerdayapp.DTOs.JobCreateRequest;
import com.careerday.careerdayapp.DTOs.JobResponse;
import com.careerday.careerdayapp.DTOs.JobUpdateRequest;
import com.careerday.careerdayapp.DTOs.PagedResponse;
import com.careerday.careerdayapp.Services.IJobService;
import com.careerday.careerdayapp.Utils.AppConstants;

@RestController
@RequestMapping("/api/v1/jobs")
public class JobController{
	private final IJobService jobService;
	
	public JobController(IJobService jobService){
		this.jobService=jobService;
	}
	
	@GetMapping
    public ResponseEntity<PagedResponse<JobResponse>> getAll(
	@RequestParam(value="page", required=false, defaultValue=AppConstants.DEFAULT_PAGE_NUMBER) Integer page,
	@RequestParam(value="size", required=false, defaultValue=AppConstants.DEFAULT_PAGE_SIZE) Integer size){
		PagedResponse<JobResponse> response=jobService.getAllJobs(page,size);
		return new ResponseEntity<>(response,HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<JobResponse> getById(@PathVariable(value="id") Long id){
		JobResponse response=jobService.getById(id);
		return new ResponseEntity<>(response,HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<JobResponse> addJob(@Valid @RequestBody JobCreateRequest request){
		JobResponse response=jobService.create(request);
		
		return new ResponseEntity<>(response,HttpStatus.CREATED);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<JobResponse> updateJob(@PathVariable(value="id") Long id, 
	       @Valid @RequestBody JobUpdateRequest request){
		JobResponse response=jobService.update(id,request);
		return new ResponseEntity<>(response,HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<ApiResponse> deleteJob(@PathVariable(value="id") Long id){
		ApiResponse response=jobService.delete(id);
		return new ResponseEntity<>(response,HttpStatus.OK);
	}
	
}