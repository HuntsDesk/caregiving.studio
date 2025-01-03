/*
  # Create contacts schema

  1. New Tables
    - `contacts`
      - `id` (uuid, primary key)
      - `type` (text) - patient, doctor, or pharmacy
      - `first_name` (text)
      - `last_name` (text)
      - `phone` (text, nullable)
      - `email` (text, nullable)
      - `specialty` (text, nullable) - for doctors
      - `facility` (text, nullable) - for doctors/pharmacies
      - `street` (text, nullable)
      - `city` (text, nullable)
      - `state` (text, nullable)
      - `zip_code` (text, nullable)
      - `notes` (text, nullable)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      - `user_id` (uuid) - references auth.users

  2. Security
    - Enable RLS
    - Add policies for authenticated users to manage their own contacts
*/

CREATE TABLE contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('patient', 'doctor', 'pharmacy')),
  first_name text NOT NULL,
  last_name text NOT NULL,
  phone text,
  email text,
  specialty text,
  facility text,
  street text,
  city text,
  state text,
  zip_code text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  user_id uuid NOT NULL REFERENCES auth.users(id)
);

ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Policy for users to select their own contacts
CREATE POLICY "Users can view their own contacts"
  ON contacts
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy for users to insert their own contacts
CREATE POLICY "Users can insert their own contacts"
  ON contacts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy for users to update their own contacts
CREATE POLICY "Users can update their own contacts"
  ON contacts
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy for users to delete their own contacts
CREATE POLICY "Users can delete their own contacts"
  ON contacts
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);