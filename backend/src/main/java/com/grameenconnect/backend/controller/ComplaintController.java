package com.grameenconnect.backend.controller;

import com.grameenconnect.backend.dto.ComplaintDTO;
import com.grameenconnect.backend.model.Complaint;
import com.grameenconnect.backend.repository.ComplaintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/complaints")
@CrossOrigin("*")
public class ComplaintController {

    @Autowired
    private ComplaintRepository complaintRepo;

    // ✅ Submit a complaint with error handling
    @PostMapping("/submit")
    public ResponseEntity<?> submit(@RequestBody ComplaintDTO dto) {
        try {
            Complaint complaint = new Complaint();

            // Set fields
            complaint.setName(dto.getName());
            complaint.setEmail(dto.getEmail());
            complaint.setCategory(dto.getCategory());
            complaint.setMessage(dto.getMessage());
            complaint.setStatus("Pending"); // default
            complaint.setLocation(dto.getLocation());
            complaint.setImageUrl(dto.getImageUrl());
            complaint.setLatitude(dto.getLatitude());
            complaint.setLongitude(dto.getLongitude());

            Complaint saved = complaintRepo.save(complaint);
            System.out.println("✅ Complaint submitted with ID: " + saved.getId());

            return ResponseEntity.ok(saved); // return the saved complaint
        } catch (Exception e) {
            System.err.println("❌ Error while submitting complaint: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body("Something went wrong while saving complaint.");
        }
    }

    // ✅ Get all complaints
    @GetMapping("/all")
    public ResponseEntity<List<Complaint>> getAll() {
        try {
            List<Complaint> list = complaintRepo.findAll();
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    // ✅ Update status to "Resolved"
    @PutMapping("/updateStatus/{id}")
    public ResponseEntity<String> updateStatus(@PathVariable Long id) {
        try {
            return complaintRepo.findById(id)
                .map(complaint -> {
                    complaint.setStatus("Resolved");
                    complaintRepo.save(complaint);
                    return ResponseEntity.ok("✅ Complaint marked as Resolved");
                })
                .orElse(ResponseEntity.status(404).body("❌ Complaint not found"));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("❌ Error updating status");
        }
    }
}
