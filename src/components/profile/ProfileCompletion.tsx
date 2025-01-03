import React from 'react';
import { Progress } from '../ui/progress';
import type { UserProfile } from '../../types/profile';

interface ProfileCompletionProps {
  profile: UserProfile;
}

export default function ProfileCompletion({ profile }: ProfileCompletionProps) {
  const calculateCompletion = () => {
    const requiredFields = [
      'first_name',
      'last_name',
      'email',
      'phone_number',
      'street',
      'city',
      'state',
      'zip_code',
      'emergency_contact_name',
      'emergency_contact_relationship',
      'emergency_contact_phone'
    ];

    const completedFields = requiredFields.filter(field => 
      profile[field as keyof UserProfile]
    );

    return Math.round((completedFields.length / requiredFields.length) * 100);
  };

  const percentage = calculateCompletion();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Profile Completion
        </h3>
        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
          {percentage}%
        </span>
      </div>
      <Progress value={percentage} className="h-2" />
      {percentage < 100 && (
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Complete your profile to improve your experience
        </p>
      )}
    </div>
  );
}