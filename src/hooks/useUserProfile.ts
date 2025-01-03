import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import type { UserProfile, ProfileFormData } from '../types/profile';

export function useUserProfile() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) {
        // If no profile exists, create one
        if (error.code === 'PGRST116') {
          const { data: newProfile, error: createError } = await supabase
            .from('user_profiles')
            .insert({
              user_id: user.id,
              first_name: 'New',
              last_name: 'User',
              email: user.email || '',
              phone_number: '',
              street: '',
              city: '',
              state: '',
              zip_code: '',
              emergency_contact_name: '',
              emergency_contact_relationship: '',
              emergency_contact_phone: '',
              privacy_settings: {
                showEmail: false,
                showPhone: false,
                showAddress: false
              }
            })
            .select()
            .single();

          if (createError) throw createError;
          setProfile(newProfile);
          return;
        }
        throw error;
      }

      setProfile(data);
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError(err instanceof Error ? err.message : 'Failed to load profile');
      showToast('Failed to load profile', 'error');
    } finally {
      setLoading(false);
    }
  }, [user, showToast]);

  const updateProfile = async (updates: Partial<ProfileFormData>) => {
    if (!user) throw new Error('User must be authenticated');

    try {
      setError(null);

      const { error } = await supabase
        .from('user_profiles')
        .update({
          first_name: updates.firstName,
          middle_name: updates.middleName,
          last_name: updates.lastName,
          email: updates.email,
          phone_number: updates.phoneNumber,
          street: updates.street,
          city: updates.city,
          state: updates.state,
          zip_code: updates.zipCode,
          emergency_contact_name: updates.emergencyContactName,
          emergency_contact_relationship: updates.emergencyContactRelationship,
          emergency_contact_phone: updates.emergencyContactPhone,
          emergency_contact_email: updates.emergencyContactEmail,
          profile_photo: updates.profilePhoto,
          pronouns: updates.pronouns,
          bio: updates.bio,
          privacy_settings: updates.privacySettings,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (error) throw error;
      
      showToast('Profile updated successfully', 'success');
      await fetchProfile();
    } catch (err) {
      console.error('Error updating profile:', err);
      const message = err instanceof Error ? err.message : 'Failed to update profile';
      showToast(message, 'error');
      throw new Error(message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user, fetchProfile]);

  return {
    profile,
    loading,
    error,
    updateProfile,
    refresh: fetchProfile
  };
}