package com.example.employeeleavemanagement.service;

import com.example.employeeleavemanagement.dto.EmployeeDto;
import com.example.employeeleavemanagement.entity.Employee;
import com.example.employeeleavemanagement.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public EmployeeDto getEmployeeById(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with ID: " + id));
        return convertToDto(employee);
    }

    public List<EmployeeDto> getAllEmployees(String search) {
        List<Employee> employees;
        if (search != null && !search.trim().isEmpty()) {
            employees = employeeRepository.findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrEmailContainingIgnoreCase(
                    search.trim(), search.trim(), search.trim());
        } else {
            employees = employeeRepository.findAll();
        }
        return employees.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public EmployeeDto updateEmployee(Long id, EmployeeDto dto) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with ID: " + id));

        if (dto.getFirstName() != null) employee.setFirstName(dto.getFirstName());
        if (dto.getLastName() != null) employee.setLastName(dto.getLastName());
        if (dto.getDepartment() != null) employee.setDepartment(dto.getDepartment());
        if (dto.getDesignation() != null) employee.setDesignation(dto.getDesignation());
        if (dto.getPhone() != null) employee.setPhone(dto.getPhone());
        if (dto.getJoiningDate() != null) employee.setJoiningDate(dto.getJoiningDate());
        if (dto.getRole() != null) employee.setRole(dto.getRole());

        Employee updated = employeeRepository.save(employee);
        return convertToDto(updated);
    }

    public void deleteEmployee(Long id) {
        if (!employeeRepository.existsById(id)) {
            throw new RuntimeException("Employee not found with ID: " + id);
        }
        employeeRepository.deleteById(id);
    }

    private EmployeeDto convertToDto(Employee employee) {
        return new EmployeeDto(
                employee.getId(),
                employee.getFirstName(),
                employee.getLastName(),
                employee.getEmail(),
                employee.getDepartment(),
                employee.getDesignation(),
                employee.getPhone(),
                employee.getJoiningDate(),
                employee.getRole()
        );
    }
}
