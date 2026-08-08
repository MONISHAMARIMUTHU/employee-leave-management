package com.example.employeeleavemanagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.example.employeeleavemanagement.repository")
@EntityScan(basePackages = "com.example.employeeleavemanagement.entity")
public class EmployeeLeaveManagementApplication {

    public static void main(String[] args) {
        SpringApplication.run(EmployeeLeaveManagementApplication.class, args);
    }
}

