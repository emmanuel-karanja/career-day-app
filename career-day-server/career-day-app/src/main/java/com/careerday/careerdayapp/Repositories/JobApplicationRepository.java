package com.careerday.careerdayapp.Repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.careerday.careerdayapp.Entities.JobApplication;

@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication,Long>{}