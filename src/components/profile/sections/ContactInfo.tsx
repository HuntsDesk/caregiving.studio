import React from 'react';
import { Card } from '../../ui/card';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import type { UserProfile } from '../../../types/profile';

interface ContactInfoProps {
  profile: UserProfile;
  onUpdate: (updates: Partial<UserProfile>) => Promise<void>;
}

export default function ContactInfo({ profile, onUpdate }: ContactInfoProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    await onUpdate({
      email: formData.get('email') as string,
      phone_number: formData.get('phoneNumber') as string,
      street: formData.get('street') as string,
      city: formData.get('city') as string,
      state: formData.get('state') as string,
      zip_code: formData.get('zipCode') as string,
      emergency_contact_name: formData.get('emergencyName') as string,
      emergency_contact_relationship: formData.get('emergencyRelationship') as string,
      emergency_contact_phone: formData.get('emergencyPhone') as string,
      emergency_contact_email: formData.get('emergencyEmail') as string || null
    });
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-8 p-6">
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Primary Contact</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input
                type="email"
                name="email"
                defaultValue={profile.email || ''}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              <Input
                type="tel"
                name="phoneNumber"
                defaultValue={profile.phone_number || ''}
                required
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-medium">Address</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Street Address</label>
              <Input
                name="street"
                defaultValue={profile.street || ''}
                required
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">City</label>
                <Input
                  name="city"
                  defaultValue={profile.city || ''}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">State</label>
                <Input
                  name="state"
                  defaultValue={profile.state || ''}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">ZIP Code</label>
                <Input
                  name="zipCode"
                  defaultValue={profile.zip_code || ''}
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-medium">Emergency Contact</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <Input
                name="emergencyName"
                defaultValue={profile.emergency_contact_name || ''}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Relationship</label>
              <Input
                name="emergencyRelationship"
                defaultValue={profile.emergency_contact_relationship || ''}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              <Input
                type="tel"
                name="emergencyPhone"
                defaultValue={profile.emergency_contact_phone || ''}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input
                type="email"
                name="emergencyEmail"
                defaultValue={profile.emergency_contact_email || ''}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </Card>
  );
}