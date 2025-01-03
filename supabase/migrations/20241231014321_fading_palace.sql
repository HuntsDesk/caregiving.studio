/*
  # Add demo contacts

  1. New Data
    - Adds sample patients, doctors, and pharmacies for demo purposes
    - Each contact type has multiple examples with realistic data
    - Includes various specialties for doctors and different pharmacy chains

  2. Security
    - All contacts are associated with the authenticated user
    - Maintains existing RLS policies
*/

-- Insert demo contacts using a DO block
DO $$
DECLARE
  user_id uuid;
BEGIN
  -- Get the first user from auth.users (for demo purposes)
  SELECT id INTO user_id FROM auth.users LIMIT 1;

  -- Only proceed if we have a user
  IF user_id IS NOT NULL THEN
    -- Patients
    INSERT INTO contacts (type, first_name, last_name, phone, email, street, city, state, zip_code, notes, user_id)
    VALUES
      ('patient', 'John', 'Smith', '(555) 123-4567', 'john.smith@example.com', '123 Main St', 'Springfield', 'IL', '62701', 'Allergic to penicillin', user_id),
      ('patient', 'Emma', 'Johnson', '(555) 234-5678', 'emma.j@example.com', '456 Oak Ave', 'Springfield', 'IL', '62702', 'Diabetic', user_id),
      ('patient', 'Michael', 'Brown', '(555) 345-6789', 'mbrown@example.com', '789 Elm St', 'Springfield', 'IL', '62703', 'High blood pressure', user_id),
      ('patient', 'Sarah', 'Davis', '(555) 456-7890', 'sdavis@example.com', '321 Pine Rd', 'Springfield', 'IL', '62704', 'Regular checkup patient', user_id);

    -- Doctors
    INSERT INTO contacts (type, first_name, last_name, phone, email, specialty, facility, street, city, state, zip_code, notes, user_id)
    VALUES
      ('doctor', 'David', 'Williams', '(555) 567-8901', 'dr.williams@hospital.com', 'Primary Care', 'Springfield Medical Center', '100 Hospital Dr', 'Springfield', 'IL', '62701', 'Primary care physician', user_id),
      ('doctor', 'Jennifer', 'Martinez', '(555) 678-9012', 'dr.martinez@hospital.com', 'Cardiology', 'Heart & Vascular Institute', '200 Cardiac Way', 'Springfield', 'IL', '62701', 'Cardiologist', user_id),
      ('doctor', 'Robert', 'Anderson', '(555) 789-0123', 'dr.anderson@hospital.com', 'Endocrinology', 'Springfield Medical Center', '100 Hospital Dr', 'Springfield', 'IL', '62701', 'Diabetes specialist', user_id),
      ('doctor', 'Lisa', 'Thompson', '(555) 890-1234', 'dr.thompson@hospital.com', 'Neurology', 'Neuroscience Center', '300 Brain Ave', 'Springfield', 'IL', '62702', 'Neurologist', user_id);

    -- Pharmacies
    INSERT INTO contacts (type, first_name, last_name, phone, email, facility, street, city, state, zip_code, notes, user_id)
    VALUES
      ('pharmacy', 'CVS', 'Pharmacy', '(555) 901-2345', 'cvs.springfield@cvs.com', 'CVS Pharmacy', '400 Main St', 'Springfield', 'IL', '62701', '24-hour pharmacy', user_id),
      ('pharmacy', 'Walgreens', 'Downtown', '(555) 012-3456', 'walgreens.downtown@walgreens.com', 'Walgreens', '500 Oak Ave', 'Springfield', 'IL', '62702', 'Drive-through available', user_id),
      ('pharmacy', 'Health Plus', 'Pharmacy', '(555) 123-4567', 'healthplus@example.com', 'Health Plus Independent Pharmacy', '600 Elm St', 'Springfield', 'IL', '62703', 'Local independent pharmacy', user_id),
      ('pharmacy', 'Hospital', 'Pharmacy', '(555) 234-5678', 'hospital.pharmacy@hospital.com', 'Springfield Medical Center Pharmacy', '100 Hospital Dr', 'Springfield', 'IL', '62701', 'In-hospital pharmacy', user_id);
  END IF;
END;
$$;