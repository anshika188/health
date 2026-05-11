-- Database Schema for Compliance Health Dashboard

CREATE DATABASE IF NOT EXISTS compliance_db;
USE compliance_db;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('Admin', 'Auditor', 'Employee') DEFAULT 'Employee',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Compliance Records Table
CREATE TABLE IF NOT EXISTS compliance_records (
    id INT AUTO_INCREMENT PRIMARY KEY,
    department VARCHAR(255) NOT NULL,
    regulation_type VARCHAR(255) NOT NULL,
    status ENUM('Compliant', 'Non-Compliant', 'Pending', 'In-Review') DEFAULT 'Pending',
    risk_level ENUM('Low', 'Medium', 'High', 'Critical') DEFAULT 'Low',
    last_audit_date DATE,
    assigned_officer VARCHAR(255),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Audits Table
CREATE TABLE IF NOT EXISTS audits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    audit_name VARCHAR(255) NOT NULL,
    department VARCHAR(255) NOT NULL,
    auditor VARCHAR(255) NOT NULL,
    audit_date DATE,
    findings TEXT,
    severity ENUM('Low', 'Medium', 'High', 'Critical') DEFAULT 'Low',
    status ENUM('Completed', 'In-Progress', 'Scheduled') DEFAULT 'Scheduled',
    corrective_actions TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notifications Table
CREATE TABLE IF NOT EXISTS notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type ENUM('Alert', 'Update', 'Action') DEFAULT 'Update',
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed Data
INSERT INTO users (name, email, password, role) VALUES 
('Admin User', 'admin@example.com', '$2a$10$X7vH.rEwG.f6K5t1u6z.e.VfGfGfGfGfGfGfGfGfGfGfGfGfGf', 'Admin'), -- pass: password123 (hashed placeholder)
('Auditor User', 'auditor@example.com', '$2a$10$X7vH.rEwG.f6K5t1u6z.e.VfGfGfGfGfGfGfGfGfGfGfGfGfGf', 'Auditor');

INSERT INTO compliance_records (department, regulation_type, status, risk_level, last_audit_date, assigned_officer) VALUES
('IT', 'ISO 27001', 'Compliant', 'Low', '2026-04-15', 'John Doe'),
('Finance', 'SOX', 'Non-Compliant', 'High', '2026-05-01', 'Jane Smith'),
('HR', 'GDPR', 'In-Review', 'Medium', '2026-05-05', 'Robert Brown');

INSERT INTO audits (audit_name, department, auditor, audit_date, status, severity) VALUES
('Annual Security Audit', 'IT', 'Auditor User', '2026-04-10', 'Completed', 'Low'),
('Financial Review', 'Finance', 'Auditor User', '2026-05-15', 'In-Progress', 'High');
