package com.careerday.careerdayapp.DTOs;


import java.util.Collection;

import com.careerday.careerdayapp.DTOs.RoleResponse;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;

@Getter
@Setter
@Accessors(chain = true)
@NoArgsConstructor
@ToString
@JsonInclude(value = JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserResponse {
   private String firstName;
   private String lastName;
   private String email;
   private String phone;
   private boolean isAdmin;
   private Collection<RoleResponse> roles;
   
   public String getFullName() {
	   return firstName != null ? firstName.concat(" ").concat(lastName) : "";
   }
   
}

