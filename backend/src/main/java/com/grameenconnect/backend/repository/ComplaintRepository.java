package com.grameenconnect.backend.repository;

import com.grameenconnect.backend.model.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
}
