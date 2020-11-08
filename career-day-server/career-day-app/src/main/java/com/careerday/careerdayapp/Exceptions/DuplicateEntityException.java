package com.careerday.careerdayapp.Exceptions;

import com.careerday.careerdayapp.DTOs.ApiResponse;

import lombok.Data;

@Data
public class DuplicateEntityException extends RuntimeException {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private transient ApiResponse apiResponse;

    private String resourceName;
    private String fieldName;
    private Object fieldValue;

    public DuplicateEntityException(String resourceName, String fieldName, Object fieldValue){
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
		String message = String.format("%s with %s: '%s' already exists!", resourceName, fieldName, fieldValue);

		apiResponse = new ApiResponse(Boolean.FALSE, message);
	}

}
