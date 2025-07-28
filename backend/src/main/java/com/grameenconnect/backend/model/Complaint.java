package com.grameenconnect.backend.model;

import jakarta.persistence.*;

@Entity
public class Complaint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String category;
    private String message;
    private String location;
    private String imageUrl;
    private String status = "Pending";  // Default
    private Double latitude;
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

	private Double longitude;

    // 🔽 Getters
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getCategory() {
        return category;
    }

    public String getMessage() {
        return message;
    }

    public String getLocation() {
        return location;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public String getStatus() {
        return status;
    }

    // 🔽 Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
