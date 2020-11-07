package com.springrestapi.springrestapi.Exceptions;

import com.springrestapi.springrestapi.Payload.ApiResponse;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import lombok.Setter;
import lombok.Getter;

@Getter
@Setter
@ResponseStatus(code= HttpStatus.UNAUTHORIZED)
public class UnauthorizedException extends RuntimeException{

    /**
     *
     */
    private static final long serialVersionUID = 1L;

    private ApiResponse apiResponse;

    private String message;

    public UnauthorizedException(ApiResponse apiResponse){
        super();
        this.apiResponse=apiResponse;
    }

    public UnauthorizedException(String message){
        super(message);
    }

    public UnauthorizedException(String message, Throwable cause){
        super(message,cause);
    }

    public ApiResponse getApiResponse(){
        return apiResponse;
    }
    
}
