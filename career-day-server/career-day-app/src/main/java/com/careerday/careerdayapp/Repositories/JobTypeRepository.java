package com.careerday.careerdayapp.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.careerday.careerdayapp.Entities.JobType;

import java.util.Optional;


@Repository
public interface JobTypeRepository extends JpaRepository<JobType,Long>{
	Optional<JobType> findByName(String name);	
}