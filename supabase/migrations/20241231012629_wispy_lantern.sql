/*
  # Create prescriptions table and relationships

  1. New Tables
    - `prescriptions`
      - Basic prescription info (name, dosage, frequency, etc.)
      - References to contacts (patient, doctor, pharmacy)
      - Proper constraints and relationships
      - Timestamps for auditing

  2. Security
    - Enable RLS
    - Add policies for authenticated users
    - Ensure users can only access their own prescriptions

  3. Validation
    - Ensure contact type matches role (patient, doctor, pharmacy)
    - Add trigger to validate contact types
*/

-- Create prescriptions table
CREATE TABLE prescriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  dosage text NOT NULL,
  frequency text NOT NULL,
  start_date date NOT NULL,
  end_date date,
  active boolean DEFAULT true,
  take_with_food boolean DEFAULT false,
  notes text,
  adverse_reaction text,
  user_id uuid NOT NULL REFERENCES auth.users(id),
  patient_id uuid NOT NULL REFERENCES contacts(id),
  doctor_id uuid NOT NULL REFERENCES contacts(id),
  pharmacy_id uuid NOT NULL REFERENCES contacts(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create trigger function to validate contact types
CREATE OR REPLACE FUNCTION validate_prescription_contacts()
RETURNS TRIGGER AS $$
DECLARE
  patient_type text;
  doctor_type text;
  pharmacy_type text;
BEGIN
  -- Get contact types
  SELECT type INTO patient_type FROM contacts WHERE id = NEW.patient_id;
  SELECT type INTO doctor_type FROM contacts WHERE id = NEW.doctor_id;
  SELECT type INTO pharmacy_type FROM contacts WHERE id = NEW.pharmacy_id;

  -- Validate types
  IF patient_type != 'patient' THEN
    RAISE EXCEPTION 'Patient contact must be of type "patient"';
  END IF;

  IF doctor_type != 'doctor' THEN
    RAISE EXCEPTION 'Doctor contact must be of type "doctor"';
  END IF;

  IF pharmacy_type != 'pharmacy' THEN
    RAISE EXCEPTION 'Pharmacy contact must be of type "pharmacy"';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
CREATE TRIGGER validate_prescription_contacts_trigger
  BEFORE INSERT OR UPDATE ON prescriptions
  FOR EACH ROW
  EXECUTE FUNCTION validate_prescription_contacts();

-- Enable RLS
ALTER TABLE prescriptions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own prescriptions"
  ON prescriptions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own prescriptions"
  ON prescriptions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own prescriptions"
  ON prescriptions
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own prescriptions"
  ON prescriptions
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better query performance
CREATE INDEX idx_prescriptions_patient ON prescriptions(patient_id);
CREATE INDEX idx_prescriptions_doctor ON prescriptions(doctor_id);
CREATE INDEX idx_prescriptions_pharmacy ON prescriptions(pharmacy_id);
CREATE INDEX idx_prescriptions_user ON prescriptions(user_id);