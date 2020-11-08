package com.careerday.careerdayapp.DTOs;

import lombok.Data;

@Data
public class AvailabilityResponse {

	private boolean available;
	
	public AvailabilityResponse(boolean available) {
		this.available=available;
	}
}
