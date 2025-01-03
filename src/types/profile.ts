import { Database } from './supabase';

export type UserProfile = Database['public']['Tables']['user_profiles']['Row'];

export interface ProfileFormData {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  emergencyContactName: string;
  emergencyContactRelationship: string;
  emergencyContactPhone: string;
  emergencyContactEmail?: string;
  profilePhoto?: string;
  pronouns?: string;
  bio?: string;
  privacySettings: {
    showEmail: boolean;
    showPhone: boolean;
    showAddress: boolean;
  };
}