package com.careerday.careerdayapp.Entities;

import java.time.LocalDate;
import java.time.LocalTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import org.hibernate.annotations.NaturalId;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
//@Table(uniqueConstraints = { @UniqueConstraint(columnNames = { "interviewAt" }) })
public class Job{
  @Id
  @GeneratedValue(strategy=GenerationType.IDENTITY)
  private Long jobId;
  
  private String name;
  
  private String description;
  
  private String summary;
  
  @Enumerated(EnumType.STRING)
  private JobStatus status;
  
  @Enumerated(EnumType.STRING)
  private JobTypeName type;
  
  @Enumerated(EnumType.STRING)
  private LevelOfEducation levelOfEducation;
  
  @NaturalId
  @Column(unique=true)
  private LocalDate interviewAt;
  
  private LocalTime interviewStartTime;
  
  private LocalTime interviewEndTime;
  
  
}