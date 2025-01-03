import React from 'react';
import { Card } from '../../ui/card';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { Textarea } from '../../ui/textarea';
import type { CaregiverProfile } from '../../../types/caregiver';

interface BasicInfoProps {
  profile: CaregiverProfile;
  onUpdate: (updates: Partial<CaregiverProfile>) => Promise<void>;
}

export default function BasicInfo({ profile, onUpdate }: BasicInfoProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    await onUpdate({
      firstName: formData.get('firstName') as string,
      middleName: formData.get('middleName') as string,
      lastName: formData.get('lastName') as string,
      pronouns: formData.get('pronouns') as string,
      bio: formData.get('bio') as string,
    });
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-6 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">First Name</label>
            <Input
              name="firstName"
              defaultValue={profile.firstName}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Middle Name</label>
            <Input
              name="middleName"
              defaultValue={profile.middleName}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <Input
              name="lastName"
              defaultValue={profile.lastName}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Pronouns</label>
          <Input
            name="pronouns"
            defaultValue={profile.pronouns}
            placeholder="e.g., she/her, they/them"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Professional Bio
            <span className="text-gray-500 ml-1">(150 words max)</span>
          </label>
          <Textarea
            name="bio"
            defaultValue={profile.bio}
            maxLength={750}
            rows={4}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </Card>
  );
}