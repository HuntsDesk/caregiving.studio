/*
  # Add time block tracking to rx logs
  
  1. Changes
    - Add time_block column to rx_logs table
    - Set default time block based on prescription frequency
    - Add check constraint for valid time blocks
    - Create index for efficient querying
*/

-- First add the column as nullable
ALTER TABLE rx_logs 
ADD COLUMN time_block text;

-- Update existing records with appropriate time blocks
UPDATE rx_logs
SET time_block = (
  CASE 
    WHEN EXISTS (
      SELECT 1 
      FROM prescriptions p 
      WHERE p.id = rx_logs.prescription_id 
      AND p.frequency ILIKE '%as needed%'
    ) THEN 'as_needed'
    WHEN EXTRACT(HOUR FROM administered_at) BETWEEN 6 AND 11 THEN 'morning'
    WHEN EXTRACT(HOUR FROM administered_at) BETWEEN 12 AND 16 THEN 'afternoon'
    WHEN EXTRACT(HOUR FROM administered_at) BETWEEN 17 AND 20 THEN 'evening'
    ELSE 'bedtime'
  END
);

-- Now make it not null and add the constraint
ALTER TABLE rx_logs 
ALTER COLUMN time_block SET NOT NULL,
ADD CONSTRAINT rx_logs_time_block_check 
CHECK (time_block IN ('morning', 'afternoon', 'evening', 'bedtime', 'as_needed'));

-- Create index for time_block queries
CREATE INDEX idx_rx_logs_time_block ON rx_logs(time_block);