import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import BasicInfo from './sections/BasicInfo';
import ContactInfo from './sections/ContactInfo';
import Qualifications from './sections/Qualifications';
import Availability from './sections/Availability';
import PrivacySettings from './sections/PrivacySettings';
import ProfileCompletion from './ProfileCompletion';
import { useCaregiverProfile } from '../../hooks/useCaregiverProfile';

export default function CaregiverProfile() {
  const { profile, loading, error, updateProfile } = useCaregiverProfile();

  if (loading) {
    return <div className="p-8">Loading profile...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-600">Error loading profile: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Caregiver Profile
        </h1>
        <ProfileCompletion percentage={profile.completionPercentage} />
      </div>

      <Tabs defaultValue="basic" className="space-y-6">
        <TabsList>
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="qualifications">Qualifications</TabsTrigger>
          <TabsTrigger value="availability">Availability</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>

        <TabsContent value="basic">
          <BasicInfo profile={profile} onUpdate={updateProfile} />
        </TabsContent>

        <TabsContent value="contact">
          <ContactInfo profile={profile} onUpdate={updateProfile} />
        </TabsContent>

        <TabsContent value="qualifications">
          <Qualifications profile={profile} onUpdate={updateProfile} />
        </TabsContent>

        <TabsContent value="availability">
          <Availability profile={profile} onUpdate={updateProfile} />
        </TabsContent>

        <TabsContent value="privacy">
          <PrivacySettings profile={profile} onUpdate={updateProfile} />
        </TabsContent>
      </Tabs>
    </div>
  );
}