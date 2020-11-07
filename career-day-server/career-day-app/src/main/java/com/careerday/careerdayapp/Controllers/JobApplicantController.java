package com.careerday.careerdayapp.Controllers;

@RestController
@RequestMapping("/api/v1/job-applicants")
public class JobApplicantController{
	
	private final IJobApplicantService jobApplicantService;
	
	public(IJobApplicantService jobApplicantService){
		this.jobApplicantService=jobApplicantService;
	}
	
    @GetMapping
	public ResponseEntity<PagedResponse<JobApplicantResponse>> getAll(
	@RequestParam(name="page", required=false,defaultValue= AppConstants.DEFAULT_PAGE_NUMBER) Integer page,
	@RequestParam(name="size",required=false, defaultValue=AppConstants.DEFAULT_PAGE_SIZE) Integer size){
		PagedResponse<JobApplicantResponse>=jobApplicantService.getAllApplicants(page,size);
		
		return new ResponseEntity<>(response,HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<JobApplicant> addJobApplicant(@Valid @RequestBody JobApplicantRegisterRequest request){
		JobApplicantResponse response=jobApplicantService.addNew(request);
		
		return new ResponseEntity<>(response,HttpStatus.CREATED);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<JobApplicantResponse> getApplicant(@PathVariable(value="id") Long id){
	   JobApplicantResponse response=jobApplicantService.getById(id);
       return new ResponseEntity<>(response,HttpStatus.OK);	   
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<JobApplicantResponse> updateApplicant(@PathVariable(value="id") Long Id, 
	        JobApplicantUpdateRequest request){
				JobApplicantResponse response=jobApplicantService.update(id,request);
				return new ResponseEntity<>(response,HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<ApiResponse> deleteApplicant(@PathVariable(value="id") Long id){
		ApiResponse response=jobApplicantService.delete(id);
		return new ResponseEntity<>(response,HttpStatus.OK);
	}
	
	@GetMapping("/{id}/applications")
	public ResponseEntity<List<JobApplicationResponse>> getApplications(
	@RequestParam(value="size", required=false, defaultValue=AppConstants.DEFAULT_PAGE_NUMBER) Integer page,
	@RequestParam(value="size",required=false,defaultValue=AppConstants.DEFAULT_PAGE_SIZE) Integer size,
	@PathVariable(value="id") Long id){
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
	@PathVariable(value="applicationId") Long applicationId{
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