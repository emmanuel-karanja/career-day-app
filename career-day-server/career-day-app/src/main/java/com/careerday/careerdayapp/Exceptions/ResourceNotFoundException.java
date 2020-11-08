package com.careerday.careerdayapp.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.careerday.careerdayapp.DTOs.ApiResponse;

import lombok.Setter;
import lombok.Getter;

@Getter
@Setter
@ResponseStatus(value=HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {

   
    /**
     *
     */
    private static final long serialVersionUID = 1L;

    private transient ApiResponse apiResponse;

    private String resourceName;
    private String fieldName;
    private Object fieldValue;

    public ResourceNotFoundException(String resourceName, String fieldName, Object fieldValue){
        super();
        this.resourceName=resourceName;
        this.fieldName=fieldName;
        this.fieldValue=fieldValue;
        
        setApiResponse();
        
    }

    public ApiResponse getApiResponse(){
        return apiResponse;
    }
    
    private void setApiResponse() {
		String message = String.format("%s with %s: '%s' not found", resourceName, fieldName, fieldValue);

		apiResponse = new ApiResponse(Boolean.FALSE, message);
	}

    
}
