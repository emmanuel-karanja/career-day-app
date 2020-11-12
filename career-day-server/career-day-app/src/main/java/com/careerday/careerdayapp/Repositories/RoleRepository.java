package com.careerday.careerdayapp.Repositories;

import org.springframework.data.repository.CrudRepository;

import com.careerday.careerdayapp.Entities.Role;
import com.careerday.careerdayapp.Entities.RoleName;

public interface RoleRepository extends CrudRepository<Role, Long> {

    Role findByRoleName(RoleName role);

}
