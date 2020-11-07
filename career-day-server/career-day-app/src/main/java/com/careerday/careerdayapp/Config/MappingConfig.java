package com.careerday.careerdayapp.Mappings;

@Configuration
public class MappingConfig{	
	@Bean
    public ModelMapper modelMapper() {
       return new ModelMapper();
    }
}