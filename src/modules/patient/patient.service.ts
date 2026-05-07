import { CreatePatientInput, UpdatePatientInput, Patient, MedicalRecord } from './patient.types';
import { store } from '../../shared/database';
import { generateId } from '../../shared/id';
import { AppError } from '../../middleware/errorHandler';
import { PaginationParams, paginate, PaginatedResponse } from '../../shared/pagination';

function calculateAge(dob: string): number {
  const birth = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

export function createPatient(input: CreatePatientInput): Patient {
  const existingByPhone = [...store.patients.values()].find(
    (p) => p.phone === input.phone && p.status === 'active'
  );
  if (existingByPhone) {
    throw AppError.conflict('DUPLICATE_PHONE', `Active patient with phone ${input.phone} already exists`);
  }

  const patient: Patient = {
    id: generateId('PAT'),
    ...input,
    age: calculateAge(input.dateOfBirth),
    medicalHistory: input.medicalHistory ?? [],
    allergies: input.allergies ?? [],
    status: 'active',
    registeredAt: new Date(),
    updatedAt: new Date(),
  };

  store.patients.set(patient.id, patient);
  return patient;
}

export function getPatientById(id: string): Patient {
  const patient = store.patients.get(id);
  if (!patient) {
    throw AppError.notFound('Patient', id);
  }
  return patient;
}

export function updatePatient(id: string, input: UpdatePatientInput): Patient {
  const patient = getPatientById(id);

  if (input.phone && input.phone !== patient.phone) {
    const duplicate = [...store.patients.values()].find(
      (p) => p.phone === input.phone && p.id !== id && p.status === 'active'
    );
    if (duplicate) {
      throw AppError.conflict('DUPLICATE_PHONE', `Phone ${input.phone} already in use`);
    }
  }

  const updated: Patient = {
    ...patient,
    ...input,
    updatedAt: new Date(),
  };

  store.patients.set(id, updated);
  return updated;
}

export function deactivatePatient(id: string): void {
  const patient = getPatientById(id);
  if (patient.status === 'inactive') {
    throw AppError.badRequest('ALREADY_INACTIVE', 'Patient is already inactive');
  }
  patient.status = 'inactive';
  patient.updatedAt = new Date();
  store.patients.set(id, patient);
}

export function addMedicalRecord(id: string, record: MedicalRecord): Patient {
  const patient = getPatientById(id);
  patient.medicalHistory.push(record);
  patient.updatedAt = new Date();
  store.patients.set(id, patient);
  return patient;
}

interface PatientQuery extends PaginationParams {
  search?: string;
  status?: string;
  bloodGroup?: string;
}

export function listPatients(query: PatientQuery): PaginatedResponse<Patient> {
  let patients = [...store.patients.values()];

  if (query.status) {
    patients = patients.filter((p) => p.status === query.status);
  }

  if (query.bloodGroup) {
    patients = patients.filter((p) => p.bloodGroup === query.bloodGroup);
  }

  if (query.search) {
    const term = query.search.toLowerCase();
    patients = patients.filter(
      (p) =>
        p.firstName.toLowerCase().includes(term) ||
        p.lastName.toLowerCase().includes(term) ||
        p.phone.includes(term) ||
        p.id.toLowerCase().includes(term)
    );
  }

  return paginate(patients, query);
}
