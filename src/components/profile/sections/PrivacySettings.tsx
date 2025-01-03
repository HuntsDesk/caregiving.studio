import React from 'react';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Toggle } from '../../ui/toggle';
import type { UserProfile } from '../../../types/profile';

interface PrivacySettingsProps {
  profile: UserProfile;
  onUpdate: (updates: Partial<UserProfile>) => Promise<void>;
}

export default function PrivacySettings({ profile, onUpdate }: PrivacySettingsProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    await onUpdate({
      privacy_settings: {
        showEmail: formData.get('showEmail') === 'on',
        showPhone: formData.get('showPhone') === 'on',
        showAddress: formData.get('showAddress') === 'on'
      }
    });
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-6 p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">Show Email Address</h4>
              <p className="text-sm text-gray-500">Allow others to see your email address</p>
            </div>
            <Toggle
              name="showEmail"
              pressed={profile.privacy_settings.showEmail}
              className="ml-4"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">Show Phone Number</h4>
              <p className="text-sm text-gray-500">Allow others to see your phone number</p>
            </div>
            <Toggle
              name="showPhone"
              pressed={profile.privacy_settings.showPhone}
              className="ml-4"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">Show Address</h4>
              <p className="text-sm text-gray-500">Allow others to see your address</p>
            </div>
            <Toggle
              name="showAddress"
              pressed={profile.privacy_settings.showAddress}
              className="ml-4"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </Card>
  );
}