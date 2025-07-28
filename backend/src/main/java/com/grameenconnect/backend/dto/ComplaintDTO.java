package com.grameenconnect.backend.dto;

public class ComplaintDTO {
    private String name;
    private String email;
    private String category;
    private String message;
    private String location;
    private String imageUrl;
    /**
	 * @return the latitude
	 */
	public Double getLatitude() {
		return latitude;
	}
	/**
	 * @param latitude the latitude to set
	 */
	public void setLatitude(Double latitude) {
		this.latitude = latitude;
	}
	/**
	 * @return the longitude
	 */
	public Double getLongitude() {
		return longitude;
	}
	/**
	 * @param longitude the longitude to set
	 */
	public void setLongitude(Double longitude) {
		this.longitude = longitude;
	}
	private Double latitude;
    private Double longitude;
    
    // 🆕
    /**
	 * @return the location
	 */
	public String getLocation() {
		return location;
	}
	/**
	 * @param location the location to set
	 */
	public void setLocation(String location) {
		this.location = location;
	}
	/**
	 * @return the imageUrl
	 */
	public String getImageUrl() {
		return imageUrl;
	}
	/**
	 * @param imageUrl the imageUrl to set
	 */
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
	 

    // Getters
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getCategory() { return category; }
    public String getMessage() { return message; }

    // Setters
    public void setName(String name) { this.name = name; }
    public void setEmail(String email) { this.email = email; }
    public void setCategory(String category) { this.category = category; }
    public void setMessage(String message) { this.message = message; }
}
