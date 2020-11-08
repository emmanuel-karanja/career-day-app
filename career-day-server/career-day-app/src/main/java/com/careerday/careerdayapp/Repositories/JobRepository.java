package com.careerday.careerdayapp.Repositories;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.careerday.careerdayapp.Entities.Job;

@Repository
public interface JobRepository extends JpaRepository<Job,Long>{
	Optional<Job> findByInterviewAt(LocalDate interviewAt);
	Boolean existsByInterviewAt(LocalDate interviewAt);
}