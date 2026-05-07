export type Gender = 'male' | 'female' | 'other';
export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
export type PatientStatus = 'active' | 'inactive' | 'deceased';

export interface EmergencyContact {
  name: string;
  phone: string;
  relation: string;
}

export interface MedicalRecord {
  condition: string;
  diagnosedDate: string;
  status: 'ongoing' | 'resolved' | 'chronic';
  notes?: string;
}

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  age: number;
  gender: Gender;
  phone: string;
  email?: string;
  address: string;
  bloodGroup?: BloodGroup;
  emergencyContact?: EmergencyContact;
  medicalHistory: MedicalRecord[];
  allergies: string[];
  insuranceId?: string;
  status: PatientStatus;
  registeredAt: Date;
  updatedAt: Date;
}

export interface CreatePatientInput {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: Gender;
  phone: string;
  email?: string;
  address: string;
  bloodGroup?: BloodGroup;
  emergencyContact?: EmergencyContact;
  medicalHistory?: MedicalRecord[];
  allergies?: string[];
  insuranceId?: string;
}

export interface UpdatePatientInput {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  address?: string;
  bloodGroup?: BloodGroup;
  emergencyContact?: EmergencyContact;
  allergies?: string[];
  insuranceId?: string;
}
