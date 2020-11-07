package com.careerday.careerdayapp.Services;

// a JobApplication should not exist without an Applicant, the 
//applicant is the who controls the JobApplications
public interface IJobApplicantService {
	
	JobApplicantResponse create(JobApplicantRegisterRequest newApplicant);
	JobApplicantResponse update(Long id,JobApplicantUpdateRequest updatedApplicant);
	JobApplicantResponse getByEmail(String email);
	JobApplicantResponse getById(Long id);
	PagedResponse<JobApplicantResponse> getAllApplicants(int size, int page);
	ApiResponse delete(Long id);
	List<JobApplicationResponse> getAllApplications(Long applicantId);
	JobApplicationResponse createApplication(Long applicantId,JobApplicationCreateRequest newApplication);
	ApiResponse deleteApplication(Long applicantId, Long applicationId);
	JobApplicationResponse getApplication(Long applicantId, Long applicationId);
    JobApplicationResponse updateApplication(Long applicantId, longApplicationId, JobApplicationUpdateRequest updatedApplication);	
}
