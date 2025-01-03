import { isValidEmail, isValidPhone } from './string';

export interface ValidationError {
  field: string;
  message: string;
}

export function validateContact(data: any): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!data.firstName?.trim()) {
    errors.push({ field: 'firstName', message: 'First name is required' });
  }

  if (!data.lastName?.trim()) {
    errors.push({ field: 'lastName', message: 'Last name is required' });
  }

  if (data.email && !isValidEmail(data.email)) {
    errors.push({ field: 'email', message: 'Invalid email address' });
  }

  if (data.phone && !isValidPhone(data.phone)) {
    errors.push({ field: 'phone', message: 'Invalid phone number' });
  }

  return errors;
}

export function validatePrescription(data: any): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!data.name?.trim()) {
    errors.push({ field: 'name', message: 'Medication name is required' });
  }

  if (!data.dosage?.trim()) {
    errors.push({ field: 'dosage', message: 'Dosage is required' });
  }

  if (!data.frequency?.trim()) {
    errors.push({ field: 'frequency', message: 'Frequency is required' });
  }

  if (!data.patientId) {
    errors.push({ field: 'patientId', message: 'Patient is required' });
  }

  return errors;
}