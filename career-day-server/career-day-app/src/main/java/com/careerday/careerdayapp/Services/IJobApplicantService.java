package com.careerday.careerdayapp.Services;

import java.util.List;

import com.careerday.careerdayapp.DTOs.ApiResponse;
import com.careerday.careerdayapp.DTOs.AvailabilityResponse;
import com.careerday.careerdayapp.DTOs.CountResponse;
import com.careerday.careerdayapp.DTOs.JobApplicantRegisterRequest;
import com.careerday.careerdayapp.DTOs.JobApplicantResponse;
import com.careerday.careerdayapp.DTOs.JobApplicantUpdateRequest;
import com.careerday.careerdayapp.DTOs.JobApplicationCreateRequest;
import com.careerday.careerdayapp.DTOs.JobApplicationResponse;
import com.careerday.careerdayapp.DTOs.JobApplicationUpdateRequest;
import com.careerday.careerdayapp.DTOs.PagedResponse;
import com.careerday.careerdayapp.Security.UserPrincipal;

// a JobApplication should not exist without an Applicant, the 
//applicant is the who controls the JobApplications
public interface IJobApplicantService {
	
	JobApplicantResponse create(JobApplicantRegisterRequest newApplicant);
	JobApplicantResponse update(UserPrincipal currentUser,Long id,JobApplicantUpdateRequest updatedApplicant);
	//JobApplicantResponse getByEmail(String email);
	JobApplicantResponse getById(Long id);
	PagedResponse<JobApplicantResponse> getAllApplicants(int size, int page);
	List<JobApplicantResponse> getAllApplicants();
	ApiResponse delete(UserPrincipal currentUser,Long id);
	List<JobApplicationResponse> getAllApplications(UserPrincipal currentUser,Long applicantId);
	JobApplicationResponse createApplication(UserPrincipal currentUser,Long applicantId,JobApplicationCreateRequest newApplication);
	ApiResponse deleteApplication(UserPrincipal currentUser,Long applicantId, Long applicationId);
	JobApplicationResponse getApplication(UserPrincipal currentUser,Long applicantId, Long applicationId);
    JobApplicationResponse updateApplication(UserPrincipal currentUser,Long applicantId, Long applicationId, 
    		                                 JobApplicationUpdateRequest updatedApplication);	
    
    AvailabilityResponse checkEmailAvailability(String email);
    AvailabilityResponse checkPhoneNumberAvailability(String phone);
    
    CountResponse getApplicationCountByApplicant(UserPrincipal currentUser,Long applicantId);
}
