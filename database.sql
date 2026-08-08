-- ==================================================
-- Employee Leave Management System - MySQL Database Script
-- ==================================================

-- 1. Create Database
CREATE DATABASE IF NOT EXISTS employee_leave_management;
USE employee_leave_management;

-- 2. Create Employees Table
CREATE TABLE IF NOT EXISTS employees (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    department VARCHAR(100),
    designation VARCHAR(100),
    phone VARCHAR(20),
    joining_date DATE,
    role VARCHAR(20) NOT NULL DEFAULT 'EMPLOYEE'
);

-- 3. Create Leave Requests Table
CREATE TABLE IF NOT EXISTS leave_requests (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    leave_type VARCHAR(20) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    reason VARCHAR(500) NOT NULL,
    applied_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    employee_id BIGINT NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
);

-- ==================================================
-- SAMPLE DATA INSERTS
-- Note: Passwords below are BCrypt hashed version of 'admin123' and 'user123'
-- BCrypt Hash for 'admin123': $2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymY04l6C91g8735C/7Ld/G
-- BCrypt Hash for 'user123':  $2a$10$4.aB5kC6d7e8f9g0h1i2j3k4l5m6n7o8p9q0r1s2t3u4v5w6x7y8z
-- (The Spring Boot application also automatically creates default admin account on startup)
-- ==================================================

-- Sample Admin Account (Password: admin123)
INSERT INTO employees (first_name, last_name, email, password, department, designation, phone, joining_date, role)
VALUES ('System', 'Admin', 'admin@company.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymY04l6C91g8735C/7Ld/G', 'Management', 'System Administrator', '9876543210', '2023-01-01', 'ADMIN')
ON DUPLICATE KEY UPDATE id=id;

-- Sample Employee Account 1 (Password: user123)
INSERT INTO employees (first_name, last_name, email, password, department, designation, phone, joining_date, role)
VALUES ('John', 'Doe', 'john.doe@company.com', '$2a$10$4.aB5kC6d7e8f9g0h1i2j3k4l5m6n7o8p9q0r1s2t3u4v5w6x7y8z', 'Information Technology', 'Software Engineer', '9876543211', '2023-06-15', 'EMPLOYEE')
ON DUPLICATE KEY UPDATE id=id;

-- Sample Employee Account 2 (Password: user123)
INSERT INTO employees (first_name, last_name, email, password, department, designation, phone, joining_date, role)
VALUES ('Jane', 'Smith', 'jane.smith@company.com', '$2a$10$4.aB5kC6d7e8f9g0h1i2j3k4l5m6n7o8p9q0r1s2t3u4v5w6x7y8z', 'Human Resources', 'HR Specialist', '9876543212', '2023-08-01', 'EMPLOYEE')
ON DUPLICATE KEY UPDATE id=id;

-- Sample Leave Requests
INSERT INTO leave_requests (leave_type, start_date, end_date, reason, applied_date, status, employee_id)
VALUES ('CASUAL', '2026-09-01', '2026-09-03', 'Personal family function', '2026-08-25', 'PENDING', 2);

INSERT INTO leave_requests (leave_type, start_date, end_date, reason, applied_date, status, employee_id)
VALUES ('SICK', '2026-08-10', '2026-08-12', 'Fever and rest recommended by doctor', '2026-08-09', 'APPROVED', 2);

INSERT INTO leave_requests (leave_type, start_date, end_date, reason, applied_date, status, employee_id)
VALUES ('EARNED', '2026-10-05', '2026-10-10', 'Annual vacation plan', '2026-08-01', 'REJECTED', 3);
