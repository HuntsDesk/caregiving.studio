/*
  # Add Administrator Access Policy
  
  1. Changes
    - Add policy for accessing administrator data in auth.users table
  
  2. Security
    - Allow authenticated users to view administrator data
*/

-- Create policy for accessing administrator data if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'auth' 
    AND tablename = 'users' 
    AND policyname = 'Users can view administrator data'
  ) THEN
    CREATE POLICY "Users can view administrator data"
      ON auth.users
      FOR SELECT
      TO authenticated
      USING (true);
  END IF;
END $$;