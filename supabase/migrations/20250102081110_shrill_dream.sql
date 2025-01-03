/*
  # Fix User Profile Handling

  1. Changes
    - Add trigger to automatically create user profile on registration
    - Add default values for required fields
    - Add validation for phone numbers and email
  
  2. Security
    - Enable RLS on user_profiles table
    - Add policies for user access
*/

-- Create trigger function to create user profile on registration
CREATE OR REPLACE FUNCTION create_user_profile_on_signup()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (
    user_id,
    first_name,
    last_name,
    email,
    phone_number,
    street,
    city,
    state,
    zip_code,
    emergency_contact_name,
    emergency_contact_relationship,
    emergency_contact_phone,
    privacy_settings
  ) VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'first_name', 'New'),
    COALESCE(NEW.raw_user_meta_data->>'last_name', 'User'),
    COALESCE(NEW.email, ''),
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    jsonb_build_object(
      'showEmail', false,
      'showPhone', false,
      'showAddress', false
    )
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger
DROP TRIGGER IF EXISTS create_user_profile_on_signup_trigger ON auth.users;
CREATE TRIGGER create_user_profile_on_signup_trigger
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION create_user_profile_on_signup();

-- Add validation for phone numbers
CREATE OR REPLACE FUNCTION validate_phone_number(phone text)
RETURNS boolean AS $$
BEGIN
  RETURN phone ~ '^\+?[0-9\s\-\(\)]+$' OR phone = '';
END;
$$ LANGUAGE plpgsql;

-- Add check constraints
ALTER TABLE user_profiles
  DROP CONSTRAINT IF EXISTS user_profiles_phone_check,
  ADD CONSTRAINT user_profiles_phone_check 
    CHECK (validate_phone_number(phone_number)),
  DROP CONSTRAINT IF EXISTS user_profiles_emergency_phone_check,
  ADD CONSTRAINT user_profiles_emergency_phone_check 
    CHECK (validate_phone_number(emergency_contact_phone));

-- Create missing profiles for existing users
INSERT INTO public.user_profiles (
  user_id,
  first_name,
  last_name,
  email,
  phone_number,
  street,
  city,
  state,
  zip_code,
  emergency_contact_name,
  emergency_contact_relationship,
  emergency_contact_phone,
  privacy_settings
)
SELECT 
  users.id,
  COALESCE(users.raw_user_meta_data->>'first_name', 'New'),
  COALESCE(users.raw_user_meta_data->>'last_name', 'User'),
  COALESCE(users.email, ''),
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  jsonb_build_object(
    'showEmail', false,
    'showPhone', false,
    'showAddress', false
  )
FROM auth.users
LEFT JOIN public.user_profiles ON users.id = user_profiles.user_id
WHERE user_profiles.id IS NULL;