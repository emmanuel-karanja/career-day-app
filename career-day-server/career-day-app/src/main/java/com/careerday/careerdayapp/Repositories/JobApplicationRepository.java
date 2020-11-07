package com.careerday.careerdayapp.Repositories;

import com.careerday.careerdayapp.Entities.JobApplication;

import org.springframework.data.jpa.repository.JpaRepository;

public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
    Page<JobApplication> getByApplicantId(@NotNull Long applicantId);
	Page<JobApplication> getByJob(@NotNull Long jobId);
}
