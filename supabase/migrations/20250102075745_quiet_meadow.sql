/*
  # Fix Administrator View Security
  
  1. Changes
    - Create secure administrator profiles view
    - Set up proper access control
  
  2. Security
    - Use view-level security
    - Limit exposed administrator data
*/

-- Drop existing view if it exists
DROP VIEW IF EXISTS administrator_profiles;

-- Create administrator profiles view with security built into the view definition
CREATE VIEW administrator_profiles AS 
SELECT 
  id,
  email,
  CASE 
    WHEN raw_user_meta_data->>'full_name' IS NOT NULL 
    THEN raw_user_meta_data->>'full_name'
    ELSE email
  END as display_name
FROM auth.users
WHERE auth.uid() IS NOT NULL; -- Only allow authenticated users to see data

-- Grant access to authenticated users
GRANT SELECT ON administrator_profiles TO authenticated;

-- Add foreign key constraint if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'rx_logs_administered_by_fkey'
  ) THEN
    ALTER TABLE rx_logs
    ADD CONSTRAINT rx_logs_administered_by_fkey
    FOREIGN KEY (administered_by) REFERENCES auth.users(id);
  END IF;
END $$;