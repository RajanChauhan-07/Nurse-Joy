-- Initial Seed Data for Nurse Joy Hospital System

-- Insert Registered Physicians
INSERT INTO doctors (id, name, badge_id, specialty, department, shift_hours, contact_number, bio)
VALUES
    ('1', 'Dr. Evelyn Reed, MD', 'DOC-401', 'General & Trauma Surgery', 'Surgical Services', '08:00 - 18:00', '+1 (555) 234-5678', 'Chief of surgical care and trauma resuscitation.'),
    ('2', 'Dr. Marcus Chen, MD', 'DOC-402', 'Cardiology', 'Cardiovascular Wing', '07:00 - 16:00', '+1 (555) 345-6789', 'Interventional cardiologist with focus on acute coronary syndromes.'),
    ('3', 'Dr. Sophia Patel, MD', 'DOC-403', 'Critical Care & ICU', 'Emergency & ICU', '18:00 - 06:00', '+1 (555) 456-7890', 'Lead intensivist overseeing overnight ICU coverage.'),
    ('4', 'Dr. James Wilson, MD', 'DOC-404', 'Pulmonology & Internal', 'Pulmonary Medicine', '08:30 - 17:00', '+1 (555) 567-8901', 'Pulmonologist specializing in critical respiratory support.'),
    ('5', 'Dr. Rachel Adams, MD', 'DOC-405', 'Pediatrics & Neonatology', 'Pediatric Unit', '09:00 - 17:00', '+1 (555) 678-9012', 'Pediatric specialist and neonatal emergency consultant.')
ON CONFLICT (badge_id) DO NOTHING;

-- Insert Admitted Patients
INSERT INTO patients (id, name, age, gender, blood_group, assigned_doctor, room, last_visit, notes)
VALUES
    ('1', 'Aiden Scott', 28, 'Male', 'O+', 'Dr. Evelyn Reed', 'Room 102', '2026-10-24', 'Admitted for routine post-operative monitoring.'),
    ('2', 'Clara Vance', 64, 'Female', 'A+', 'Dr. Marcus Chen', 'Room 204', '2026-10-25', 'Continuous ECG telemetry and cardiac assessment.'),
    ('3', 'Lucas Rivera', 19, 'Male', 'B+', 'Dr. Evelyn Reed', 'Room 118', '2026-10-22', 'Orthopedic rehabilitation post femoral fracture fixation.'),
    ('4', 'Eleanor Brooks', 72, 'Female', 'AB+', 'Dr. Marcus Chen', 'ICU - Bed 04', '2026-10-27', 'Critical respiratory and hemodynamic stabilization in ICU.'),
    ('5', 'Maya Lin', 34, 'Female', 'O-', 'Dr. James Wilson', 'Room 302', '2026-10-26', 'Targeted bronchoscopy follow-up and oxygen therapy.')
ON CONFLICT (id) DO NOTHING;
