/*
  # Add DELETE policy for rx_logs table

  1. Changes
    - Add policy to allow users to delete their own rx logs
*/

-- Add DELETE policy for rx_logs
CREATE POLICY "Users can delete their own rx logs"
  ON rx_logs
  FOR DELETE
  TO authenticated
  USING (administered_by = auth.uid());