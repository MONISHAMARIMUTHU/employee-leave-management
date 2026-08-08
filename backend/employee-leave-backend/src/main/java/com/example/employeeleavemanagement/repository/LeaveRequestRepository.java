package com.example.employeeleavemanagement.repository;

import com.example.employeeleavemanagement.entity.LeaveRequest;
import com.example.employeeleavemanagement.enums.LeaveStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Long> {

    List<LeaveRequest> findByEmployeeIdOrderByAppliedDateDesc(Long employeeId);

    List<LeaveRequest> findAllByOrderByAppliedDateDesc();

    List<LeaveRequest> findByStatusOrderByAppliedDateDesc(LeaveStatus status);

    long countByStatus(LeaveStatus status);
}
