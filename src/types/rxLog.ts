export interface RxLog {
  id: string;
  prescriptionId: string;
  administeredAt: string;
  administeredBy: string;
  notes?: string;
  createdAt: string;
  administrator?: {
    email: string;
    displayName: string;
  };
}

export interface RxLogWithDetails extends RxLog {
  prescription: {
    name: string;
    dosage: string;
    patient: {
      firstName: string;
      lastName: string;
    };
  };
}