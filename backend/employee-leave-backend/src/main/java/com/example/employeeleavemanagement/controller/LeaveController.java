package com.example.employeeleavemanagement.controller;

import com.example.employeeleavemanagement.dto.DashboardSummaryDto;
import com.example.employeeleavemanagement.dto.LeaveRequestDto;
import com.example.employeeleavemanagement.entity.LeaveRequest;
import com.example.employeeleavemanagement.enums.LeaveStatus;
import com.example.employeeleavemanagement.service.LeaveService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/leaves")
@CrossOrigin(origins = "*")
public class LeaveController {

    @Autowired
    private LeaveService leaveService;

    @PostMapping
    public ResponseEntity<?> applyLeave(@Valid @RequestBody LeaveRequestDto dto, Authentication authentication) {
        try {
            String userEmail = authentication.getName();
            LeaveRequest leaveRequest = leaveService.applyLeave(dto, userEmail);
            return ResponseEntity.status(HttpStatus.CREATED).body(leaveRequest);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/my")
    public ResponseEntity<List<LeaveRequest>> getMyLeaves(Authentication authentication) {
        String userEmail = authentication.getName();
        List<LeaveRequest> leaves = leaveService.getMyLeaves(userEmail);
        return ResponseEntity.ok(leaves);
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<LeaveRequest>> getAllLeaves(@RequestParam(required = false) LeaveStatus status) {
        List<LeaveRequest> leaves = leaveService.getAllLeaves(status);
        return ResponseEntity.ok(leaves);
    }

    @PutMapping("/{id}/approve")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> approveLeave(@PathVariable Long id) {
        try {
            LeaveRequest approved = leaveService.approveLeave(id);
            return ResponseEntity.ok(approved);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/{id}/reject")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> rejectLeave(@PathVariable Long id) {
        try {
            LeaveRequest rejected = leaveService.rejectLeave(id);
            return ResponseEntity.ok(rejected);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/summary")
    public ResponseEntity<DashboardSummaryDto> getDashboardSummary() {
        DashboardSummaryDto summary = leaveService.getDashboardSummary();
        return ResponseEntity.ok(summary);
    }
}
