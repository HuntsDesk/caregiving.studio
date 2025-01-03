export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      contacts: {
        Row: {
          id: string
          type: 'patient' | 'doctor' | 'pharmacy'
          first_name: string
          last_name: string
          phone: string | null
          email: string | null
          specialty: string | null
          facility: string | null
          street: string | null
          city: string | null
          state: string | null
          zip_code: string | null
          notes: string | null
          created_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          id?: string
          type: 'patient' | 'doctor' | 'pharmacy'
          first_name: string
          last_name: string
          phone?: string | null
          email?: string | null
          specialty?: string | null
          facility?: string | null
          street?: string | null
          city?: string | null
          state?: string | null
          zip_code?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          id?: string
          type?: 'patient' | 'doctor' | 'pharmacy'
          first_name?: string
          last_name?: string
          phone?: string | null
          email?: string | null
          specialty?: string | null
          facility?: string | null
          street?: string | null
          city?: string | null
          state?: string | null
          zip_code?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
          user_id?: string
        }
      }
      prescriptions: {
        Row: {
          id: string
          name: string
          dosage: string
          frequency: string
          start_date: string
          end_date: string | null
          active: boolean
          take_with_food: boolean
          notes: string | null
          adverse_reaction: string | null
          user_id: string
          patient_id: string
          doctor_id: string
          pharmacy_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          dosage: string
          frequency: string
          start_date: string
          end_date?: string | null
          active?: boolean
          take_with_food?: boolean
          notes?: string | null
          adverse_reaction?: string | null
          user_id: string
          patient_id: string
          doctor_id: string
          pharmacy_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          dosage?: string
          frequency?: string
          start_date?: string
          end_date?: string | null
          active?: boolean
          take_with_food?: boolean
          notes?: string | null
          adverse_reaction?: string | null
          user_id?: string
          patient_id?: string
          doctor_id?: string
          pharmacy_id?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}