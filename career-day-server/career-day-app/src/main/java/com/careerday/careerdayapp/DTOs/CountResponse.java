package com.careerday.careerdayapp.DTOs;

import lombok.Data;

@Data
public class CountResponse {

	private Integer count;
	
	public CountResponse(Integer count) {
		this.count=count;
	}
}
