-- Insert demo prescriptions using a DO block
DO $$
DECLARE
  user_id uuid;
  patient_john uuid;
  patient_emma uuid;
  patient_michael uuid;
  doctor_williams uuid;
  doctor_martinez uuid;
  pharmacy_cvs uuid;
  pharmacy_walgreens uuid;
BEGIN
  -- Get the first user
  SELECT id INTO user_id FROM auth.users LIMIT 1;

  -- Get contact IDs
  SELECT id INTO patient_john FROM contacts WHERE first_name = 'John' AND last_name = 'Smith' LIMIT 1;
  SELECT id INTO patient_emma FROM contacts WHERE first_name = 'Emma' AND last_name = 'Johnson' LIMIT 1;
  SELECT id INTO patient_michael FROM contacts WHERE first_name = 'Michael' AND last_name = 'Brown' LIMIT 1;
  SELECT id INTO doctor_williams FROM contacts WHERE first_name = 'David' AND last_name = 'Williams' LIMIT 1;
  SELECT id INTO doctor_martinez FROM contacts WHERE first_name = 'Jennifer' AND last_name = 'Martinez' LIMIT 1;
  SELECT id INTO pharmacy_cvs FROM contacts WHERE first_name = 'CVS' LIMIT 1;
  SELECT id INTO pharmacy_walgreens FROM contacts WHERE first_name = 'Walgreens' LIMIT 1;

  -- Only proceed if we have required data
  IF user_id IS NOT NULL 
     AND patient_john IS NOT NULL 
     AND doctor_williams IS NOT NULL 
     AND pharmacy_cvs IS NOT NULL THEN
    
    -- Prescriptions for John Smith
    INSERT INTO prescriptions (
      name, dosage, frequency, start_date, end_date, active, take_with_food,
      notes, user_id, patient_id, doctor_id, pharmacy_id
    ) VALUES
      ('Lisinopril', '10mg', 'Once daily (morning)', '2024-01-01', NULL, true, false,
       'For blood pressure management', user_id, patient_john, doctor_williams, pharmacy_cvs),
      ('Metformin', '500mg', 'Twice daily', '2024-01-01', NULL, true, true,
       'Take with meals', user_id, patient_john, doctor_williams, pharmacy_cvs),
      ('Aspirin', '81mg', 'Once daily (morning)', '2024-01-01', NULL, true, false,
       'Low-dose aspirin for heart health', user_id, patient_john, doctor_williams, pharmacy_cvs);

    -- Prescriptions for Emma Johnson
    INSERT INTO prescriptions (
      name, dosage, frequency, start_date, end_date, active, take_with_food,
      notes, user_id, patient_id, doctor_id, pharmacy_id
    ) VALUES
      ('Lantus', '20 units', 'Once daily (bedtime)', '2024-01-01', NULL, true, false,
       'Long-acting insulin', user_id, patient_emma, doctor_martinez, pharmacy_walgreens),
      ('Metformin', '1000mg', 'Twice daily', '2024-01-01', NULL, true, true,
       'Take with meals', user_id, patient_emma, doctor_martinez, pharmacy_walgreens),
      ('Vitamin D3', '2000 IU', 'Once daily (morning)', '2024-01-01', NULL, true, false,
       NULL, user_id, patient_emma, doctor_martinez, pharmacy_walgreens);

    -- Prescriptions for Michael Brown
    INSERT INTO prescriptions (
      name, dosage, frequency, start_date, end_date, active, take_with_food,
      notes, user_id, patient_id, doctor_id, pharmacy_id
    ) VALUES
      ('Amlodipine', '5mg', 'Once daily (evening)', '2024-01-01', NULL, true, false,
       'For blood pressure', user_id, patient_michael, doctor_williams, pharmacy_cvs),
      ('Ibuprofen', '400mg', 'As needed', '2024-01-01', NULL, true, true,
       'For pain relief. Take with food.', user_id, patient_michael, doctor_williams, pharmacy_cvs),
      ('Omeprazole', '20mg', 'Once daily (morning)', '2024-01-01', NULL, true, false,
       'Take on empty stomach', user_id, patient_michael, doctor_williams, pharmacy_cvs);
  END IF;
END;
$$;