package com.example.employeeleavemanagement.service;

import com.example.employeeleavemanagement.dto.JwtResponse;
import com.example.employeeleavemanagement.dto.LoginRequest;
import com.example.employeeleavemanagement.dto.RegisterRequest;
import com.example.employeeleavemanagement.entity.Employee;
import com.example.employeeleavemanagement.enums.Role;
import com.example.employeeleavemanagement.repository.EmployeeRepository;
import com.example.employeeleavemanagement.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    public String register(RegisterRequest request) {
        if (employeeRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Error: Email is already registered!");
        }

        Employee employee = new Employee();
        employee.setFirstName(request.getFirstName());
        employee.setLastName(request.getLastName());
        employee.setEmail(request.getEmail());
        employee.setPassword(passwordEncoder.encode(request.getPassword()));
        employee.setDepartment(request.getDepartment());
        employee.setDesignation(request.getDesignation());
        employee.setPhone(request.getPhone());
        employee.setJoiningDate(request.getJoiningDate());
        
        // If role specified in request use it, otherwise default to EMPLOYEE
        employee.setRole(request.getRole() != null ? request.getRole() : Role.EMPLOYEE);

        employeeRepository.save(employee);
        return "Employee registered successfully!";
    }

    public JwtResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateToken(request.getEmail());

        Employee employee = employeeRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        return new JwtResponse(
                jwt,
                employee.getId(),
                employee.getFirstName(),
                employee.getLastName(),
                employee.getEmail(),
                employee.getRole(),
                employee.getDepartment(),
                employee.getDesignation()
        );
    }
}
