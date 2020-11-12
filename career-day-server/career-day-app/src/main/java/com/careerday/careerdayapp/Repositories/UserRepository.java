package com.careerday.careerdayapp.Repositories;

import java.util.Optional;

import javax.validation.constraints.NotBlank;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.careerday.careerdayapp.Entities.User;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByEmail(@NotBlank String email);
    Boolean existsByEmail(@NotBlank String email);
}