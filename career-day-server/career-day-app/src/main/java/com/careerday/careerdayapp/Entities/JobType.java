package com.careerday.careerdayapp.Entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.NaturalId;

import lombok.Data;

@Data
@Entity
public class JobType{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long jobTypeId;

	@Enumerated(EnumType.STRING)
	@NaturalId
	private JobTypeName name;

	public JobType(JobTypeName name) {
		this.name = name;
	}
}
