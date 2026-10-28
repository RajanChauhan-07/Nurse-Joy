-- Nurse Joy Hospital Database Schema
-- Compatible with PostgreSQL, SQLite, and MySQL

CREATE TABLE IF NOT EXISTS doctors (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    badge_id VARCHAR(64) NOT NULL UNIQUE,
    specialty VARCHAR(128) NOT NULL,
    department VARCHAR(128) NOT NULL,
    shift_hours VARCHAR(64) NOT NULL,
    contact_number VARCHAR(64) NOT NULL,
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS patients (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INT NOT NULL CHECK (age > 0 AND age <= 130),
    gender VARCHAR(32) NOT NULL,
    blood_group VARCHAR(16) NOT NULL,
    assigned_doctor VARCHAR(255) NOT NULL,
    room VARCHAR(64),
    last_visit DATE NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexing for fast search & filtering
CREATE INDEX IF NOT EXISTS idx_patients_name ON patients(name);
CREATE INDEX IF NOT EXISTS idx_patients_blood_group ON patients(blood_group);
CREATE INDEX IF NOT EXISTS idx_patients_assigned_doctor ON patients(assigned_doctor);

CREATE INDEX IF NOT EXISTS idx_doctors_badge_id ON doctors(badge_id);
CREATE INDEX IF NOT EXISTS idx_doctors_specialty ON doctors(specialty);
CREATE INDEX IF NOT EXISTS idx_doctors_department ON doctors(department);
