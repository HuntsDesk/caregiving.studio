/*
  # Create Rx Logs Table
  
  1. New Tables
    - `rx_logs`
      - `id` (uuid, primary key)
      - `prescription_id` (uuid, foreign key to prescriptions)
      - `administered_at` (timestamptz)
      - `administered_by` (uuid, references auth.users)
      - `notes` (text, optional)
      - `created_at` (timestamptz)
  
  2. Security
    - Enable RLS
    - Add policies for authenticated users
*/

CREATE TABLE rx_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prescription_id uuid NOT NULL REFERENCES prescriptions(id),
  administered_at timestamptz NOT NULL,
  administered_by uuid NOT NULL REFERENCES auth.users(id),
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE rx_logs ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own rx logs"
  ON rx_logs
  FOR SELECT
  TO authenticated
  USING (
    administered_by = auth.uid() OR
    EXISTS (
      SELECT 1 FROM prescriptions p
      WHERE p.id = rx_logs.prescription_id
      AND p.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert their own rx logs"
  ON rx_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (administered_by = auth.uid());

-- Create indexes
CREATE INDEX idx_rx_logs_prescription ON rx_logs(prescription_id);
CREATE INDEX idx_rx_logs_administered_by ON rx_logs(administered_by);
CREATE INDEX idx_rx_logs_administered_at ON rx_logs(administered_at);