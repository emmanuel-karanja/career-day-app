package com.springrestapi.springrestapi.Exceptions;

import com.springrestapi.springrestapi.Payload.ApiResponse;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class AccessDeniedException extends RuntimeException{

    /**
     *
     */
    private static final long serialVersionUID = 1L;

    private ApiResponse apiResponse;

    private String message;

    public AccessDeniedException(ApiResponse apiResponse){
        super();
        this.apiResponse=apiResponse;
    }

    public AccessDeniedException(String message){
        super(message);
        this.message=message;
    }

    public AccessDeniedException(String message, Throwable cause){
        super(message,cause);
    }

    public ApiResponse getApiResponse(){
        return apiResponse;
    }
    
}