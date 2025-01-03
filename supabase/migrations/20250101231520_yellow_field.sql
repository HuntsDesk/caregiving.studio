/*
  # Update RX Logs Time Block Schema

  1. Changes
    - Update existing time_block values based on administered_at time
    - Add NOT NULL constraint
    - Add check constraint for valid values
    - Add index for performance

  2. Notes
    - Handles case where column already exists
    - Uses safe DO block for updates
*/

DO $$ 
BEGIN
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
  )
  WHERE time_block IS NULL;

  -- Add NOT NULL constraint if not already present
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'rx_logs' 
    AND column_name = 'time_block' 
    AND is_nullable = 'NO'
  ) THEN
    ALTER TABLE rx_logs ALTER COLUMN time_block SET NOT NULL;
  END IF;

  -- Add check constraint if not already present
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.constraint_column_usage 
    WHERE table_name = 'rx_logs' 
    AND constraint_name = 'rx_logs_time_block_check'
  ) THEN
    ALTER TABLE rx_logs 
    ADD CONSTRAINT rx_logs_time_block_check 
    CHECK (time_block IN ('morning', 'afternoon', 'evening', 'bedtime', 'as_needed'));
  END IF;
END $$;

-- Create index if not already present
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM pg_indexes 
    WHERE tablename = 'rx_logs' 
    AND indexname = 'idx_rx_logs_time_block'
  ) THEN
    CREATE INDEX idx_rx_logs_time_block ON rx_logs(time_block);
  END IF;
END $$;