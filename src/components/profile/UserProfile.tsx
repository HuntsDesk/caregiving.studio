import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import BasicInfo from './sections/BasicInfo';
import ContactInfo from './sections/ContactInfo';
import PrivacySettings from './sections/PrivacySettings';
import ProfileCompletion from './ProfileCompletion';
import { useUserProfile } from '../../hooks/useUserProfile';

export default function UserProfile() {
  const { profile, loading, error, updateProfile } = useUserProfile();

  if (loading) {
    return <div className="p-8">Loading profile...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-600">Error loading profile: {error}</div>;
  }

  if (!profile) {
    return <div className="p-8">No profile found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Profile Settings
        </h1>
        <ProfileCompletion profile={profile} />
      </div>

      <Tabs defaultValue="basic" className="space-y-6">
        <TabsList>
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>

        <TabsContent value="basic">
          <BasicInfo profile={profile} onUpdate={updateProfile} />
        </TabsContent>

        <TabsContent value="contact">
          <ContactInfo profile={profile} onUpdate={updateProfile} />
        </TabsContent>

        <TabsContent value="privacy">
          <PrivacySettings profile={profile} onUpdate={updateProfile} />
        </TabsContent>
      </Tabs>
    </div>
  );
}