import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import type { CaregiverProfile } from '../types/caregiver';

export function useCaregiverProfile() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<CaregiverProfile>({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
    },
    emergencyContact: {
      name: '',
      relationship: '',
      phoneNumber: '',
    },
    languages: [],
    certifications: [],
    yearsExperience: 0,
    specializations: [],
    availability: [],
    privacySettings: {
      showEmail: false,
      showPhone: false,
      showAddress: false,
      showAvailability: false,
    },
    completionPercentage: 0,
  });

  const calculateCompletionPercentage = (profile: Partial<CaregiverProfile>): number => {
    const requiredFields = [
      'firstName',
      'lastName',
      'email',
      'phoneNumber',
      ['address', 'street'],
      ['address', 'city'],
      ['address', 'state'],
      ['address', 'zipCode'],
      ['emergencyContact', 'name'],
      ['emergencyContact', 'relationship'],
      ['emergencyContact', 'phoneNumber'],
      'languages',
      'yearsExperience',
      'specializations',
    ];

    const completedFields = requiredFields.filter(field => {
      if (Array.isArray(field)) {
        return profile[field[0]]?.[field[1]];
      }
      return profile[field];
    });

    return Math.round((completedFields.length / requiredFields.length) * 100);
  };

  const fetchProfile = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('caregiver_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;

      if (data) {
        const profileData = {
          ...data,
          completionPercentage: calculateCompletionPercentage(data)
        };
        setProfile(profileData as CaregiverProfile);
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError(err instanceof Error ? err.message : 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  }, [user]);

  const updateProfile = async (updates: Partial<CaregiverProfile>) => {
    if (!user) throw new Error('User must be authenticated');

    try {
      setError(null);

      const { error } = await supabase
        .from('caregiver_profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (error) throw error;

      // Update local state with new values
      setProfile(prev => {
        const updated = { ...prev, ...updates };
        return {
          ...updated,
          completionPercentage: calculateCompletionPercentage(updated)
        };
      });
    } catch (err) {
      console.error('Error updating profile:', err);
      throw new Error(err instanceof Error ? err.message : 'Failed to update profile');
    }
  };

  // Fetch profile on mount and when user changes
  useState(() => {
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