import type { Prescription } from '../types/prescription';

export function mapSupabasePrescription(data: any): Prescription {
  return {
    id: data.id,
    name: data.name,
    dosage: data.dosage,
    frequency: data.frequency,
    startDate: data.start_date,
    endDate: data.end_date,
    active: data.active,
    takeWithFood: data.take_with_food,
    notes: data.notes,
    adverseReaction: data.adverse_reaction,
    patientId: data.patient_id,
    doctorId: data.doctor_id,
    pharmacyId: data.pharmacy_id,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    patient: {
      id: data.patient.id,
      firstName: data.patient.first_name,
      lastName: data.patient.last_name,
      phone: data.patient.phone
    },
    doctor: data.doctor ? {
      id: data.doctor.id,
      firstName: data.doctor.first_name,
      lastName: data.doctor.last_name,
      specialty: data.doctor.specialty,
      phone: data.doctor.phone
    } : undefined,
    pharmacy: data.pharmacy ? {
      id: data.pharmacy.id,
      firstName: data.pharmacy.first_name,
      lastName: data.pharmacy.last_name,
      facility: data.pharmacy.facility,
      phone: data.pharmacy.phone
    } : undefined
  };
}