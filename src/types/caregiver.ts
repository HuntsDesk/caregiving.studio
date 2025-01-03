export interface CaregiverProfile {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  preferredContactTimes?: {
    start: string;
    end: string;
  }[];
  secondaryContact?: {
    method: 'email' | 'phone' | 'other';
    value: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  emergencyContact: {
    name: string;
    relationship: string;
    phoneNumber: string;
    email?: string;
  };
  profilePhoto?: string;
  pronouns?: string;
  languages: string[];
  certifications: {
    name: string;
    issuer: string;
    expirationDate?: string;
  }[];
  yearsExperience: number;
  specializations: string[];
  availability: {
    dayOfWeek: number;
    shifts: {
      start: string;
      end: string;
    }[];
  }[];
  bio?: string;
  privacySettings: {
    showEmail: boolean;
    showPhone: boolean;
    showAddress: boolean;
    showAvailability: boolean;
  };
  completionPercentage: number;
}