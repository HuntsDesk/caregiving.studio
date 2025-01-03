import React from 'react';
import { Card } from '../../ui/card';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import type { CaregiverProfile } from '../../../types/caregiver';

interface QualificationsProps {
  profile: CaregiverProfile;
  onUpdate: (updates: Partial<CaregiverProfile>) => Promise<void>;
}

export default function Qualifications({ profile, onUpdate }: QualificationsProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const languages = formData.get('languages')?.toString().split(',').map(lang => lang.trim()) || [];
    const specializations = formData.get('specializations')?.toString().split(',').map(spec => spec.trim()) || [];
    
    await onUpdate({
      languages,
      specializations,
      yearsExperience: Number(formData.get('yearsExperience')),
      certifications: profile.certifications // This would need a more complex UI for adding/removing certifications
    });
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-6 p-6">
        <div>
          <label className="block text-sm font-medium mb-1">Years of Experience</label>
          <Input
            type="number"
            name="yearsExperience"
            defaultValue={profile.yearsExperience}
            min="0"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Languages</label>
          <Input
            name="languages"
            defaultValue={profile.languages.join(', ')}
            placeholder="English, Spanish, etc."
            required
          />
          <p className="mt-1 text-sm text-gray-500">Separate languages with commas</p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Specializations</label>
          <Input
            name="specializations"
            defaultValue={profile.specializations.join(', ')}
            placeholder="Elderly care, Disability support, etc."
            required
          />
          <p className="mt-1 text-sm text-gray-500">Separate specializations with commas</p>
        </div>

        <div className="flex justify-end">
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </Card>
  );
}