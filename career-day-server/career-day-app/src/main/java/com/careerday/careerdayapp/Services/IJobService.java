package com.careerday.careerdayapp.Services;

import com.careerday.careerdayapp.DTOs.ApiResponse;

public interface IJobService {
    JobResponse create(JobCreateRequest createRequest);

    JobResponse update(Long id, JobUpdateRequest updateRequest);

    ApiResponse delete(Long id);

    JobResponse getById(Long id);

    PagedResponse<JobResponse> getAllJobs(int size, int page);
	
	

}
