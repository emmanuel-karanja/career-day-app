package com.careerday.careerdayapp.Repositories;

import com.careerday.careerdayapp.Entities.Job;

import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRepository extends JpaRepository<Job, Long> {
	Optional<Job> findByInterviewDate(@NotNull LocalDate interviewDate);
	
}