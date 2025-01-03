import type { RxLogWithDetails } from '../types/rxLog';

export function formatRxLogResponse(log: any): RxLogWithDetails {
  return {
    id: log.id,
    prescriptionId: log.prescription_id,
    administeredAt: log.administered_at,
    administeredBy: log.administered_by,
    notes: log.notes,
    createdAt: log.created_at,
    administrator: log.administrator ? {
      email: log.administrator.email,
      displayName: log.administrator.display_name
    } : undefined,
    prescription: {
      name: log.prescription.name,
      dosage: log.prescription.dosage,
      patient: {
        firstName: log.prescription.patient.first_name,
        lastName: log.prescription.patient.last_name
      }
    }
  };
}