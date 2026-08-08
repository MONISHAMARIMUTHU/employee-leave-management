package com.example.employeeleavemanagement.config;

import com.example.employeeleavemanagement.entity.Employee;
import com.example.employeeleavemanagement.enums.Role;
import com.example.employeeleavemanagement.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Create default Admin account if no employee exists or admin doesn't exist
        if (!employeeRepository.existsByEmail("admin@company.com")) {
            Employee admin = new Employee();
            admin.setFirstName("System");
            admin.setLastName("Admin");
            admin.setEmail("admin@company.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setDepartment("Management");
            admin.setDesignation("System Administrator");
            admin.setPhone("9876543210");
            admin.setJoiningDate(LocalDate.now());
            admin.setRole(Role.ADMIN);

            employeeRepository.save(admin);
            System.out.println("Default admin user created: admin@company.com / admin123");
        }
    }
}
