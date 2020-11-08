package com.careerday.careerdayapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


@SpringBootApplication
public class CareerDayAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(CareerDayAppApplication.class, args);
	}

}
