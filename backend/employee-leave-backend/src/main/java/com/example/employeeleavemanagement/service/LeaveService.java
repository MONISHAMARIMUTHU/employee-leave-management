package com.example.employeeleavemanagement.service;

import com.example.employeeleavemanagement.dto.DashboardSummaryDto;
import com.example.employeeleavemanagement.dto.LeaveRequestDto;
import com.example.employeeleavemanagement.entity.Employee;
import com.example.employeeleavemanagement.entity.LeaveRequest;
import com.example.employeeleavemanagement.enums.LeaveStatus;
import com.example.employeeleavemanagement.repository.EmployeeRepository;
import com.example.employeeleavemanagement.repository.LeaveRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class LeaveService {

    @Autowired
    private LeaveRequestRepository leaveRequestRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    public LeaveRequest applyLeave(LeaveRequestDto dto, String userEmail) {
        Employee employee = employeeRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Employee not found with email: " + userEmail));

        if (dto.getEndDate().isBefore(dto.getStartDate())) {
            throw new RuntimeException("End date cannot be before start date!");
        }

        LeaveRequest leaveRequest = new LeaveRequest();
        leaveRequest.setLeaveType(dto.getLeaveType());
        leaveRequest.setStartDate(dto.getStartDate());
        leaveRequest.setEndDate(dto.getEndDate());
        leaveRequest.setReason(dto.getReason());
        leaveRequest.setAppliedDate(LocalDate.now());
        leaveRequest.setStatus(LeaveStatus.PENDING);
        leaveRequest.setEmployee(employee);

        return leaveRequestRepository.save(leaveRequest);
    }

    public List<LeaveRequest> getMyLeaves(String userEmail) {
        Employee employee = employeeRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Employee not found with email: " + userEmail));

        return leaveRequestRepository.findByEmployeeIdOrderByAppliedDateDesc(employee.getId());
    }

    public List<LeaveRequest> getAllLeaves(LeaveStatus status) {
        if (status != null) {
            return leaveRequestRepository.findByStatusOrderByAppliedDateDesc(status);
        }
        return leaveRequestRepository.findAllByOrderByAppliedDateDesc();
    }

    public LeaveRequest approveLeave(Long id) {
        LeaveRequest leaveRequest = leaveRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Leave request not found with ID: " + id));

        leaveRequest.setStatus(LeaveStatus.APPROVED);
        return leaveRequestRepository.save(leaveRequest);
    }

    public LeaveRequest rejectLeave(Long id) {
        LeaveRequest leaveRequest = leaveRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Leave request not found with ID: " + id));

        leaveRequest.setStatus(LeaveStatus.REJECTED);
        return leaveRequestRepository.save(leaveRequest);
    }

    public DashboardSummaryDto getDashboardSummary() {
        long totalEmployees = employeeRepository.count();
        long totalLeaves = leaveRequestRepository.count();
        long pending = leaveRequestRepository.countByStatus(LeaveStatus.PENDING);
        long approved = leaveRequestRepository.countByStatus(LeaveStatus.APPROVED);
        long rejected = leaveRequestRepository.countByStatus(LeaveStatus.REJECTED);

        return new DashboardSummaryDto(totalEmployees, totalLeaves, pending, approved, rejected);
    }
}
