import { z } from 'zod';

const phoneRegex = /^[6-9]\d{9}$/;
const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] as const;

const emergencyContactSchema = z.object({
  name: z.string().min(2).max(100),
  phone: z.string().regex(phoneRegex, 'Invalid Indian phone number'),
  relation: z.string().min(2).max(50),
});

const medicalRecordSchema = z.object({
  condition: z.string().min(2).max(200),
  diagnosedDate: z.string().refine((d) => !isNaN(Date.parse(d)), 'Invalid date'),
  status: z.enum(['ongoing', 'resolved', 'chronic']),
  notes: z.string().max(500).optional(),
});

export const createPatientSchema = z.object({
  firstName: z.string().min(1).max(100).trim(),
  lastName: z.string().min(1).max(100).trim(),
  dateOfBirth: z.string().refine((d) => {
    const parsed = new Date(d);
    return !isNaN(parsed.getTime()) && parsed < new Date();
  }, 'Date of birth must be a valid past date'),
  gender: z.enum(['male', 'female', 'other']),
  phone: z.string().regex(phoneRegex, 'Phone must be a valid 10-digit Indian number'),
  email: z.string().email().optional(),
  address: z.string().min(5).max(500),
  bloodGroup: z.enum(bloodGroups).optional(),
  emergencyContact: emergencyContactSchema.optional(),
  medicalHistory: z.array(medicalRecordSchema).optional().default([]),
  allergies: z.array(z.string().min(1).max(100)).optional().default([]),
  insuranceId: z.string().max(50).optional(),
});

export const updatePatientSchema = z.object({
  firstName: z.string().min(1).max(100).trim().optional(),
  lastName: z.string().min(1).max(100).trim().optional(),
  phone: z.string().regex(phoneRegex).optional(),
  email: z.string().email().optional(),
  address: z.string().min(5).max(500).optional(),
  bloodGroup: z.enum(bloodGroups).optional(),
  emergencyContact: emergencyContactSchema.optional(),
  allergies: z.array(z.string()).optional(),
  insuranceId: z.string().max(50).optional(),
});

export const patientQuerySchema = z.object({
  search: z.string().optional(),
  status: z.enum(['active', 'inactive', 'deceased']).optional(),
  bloodGroup: z.enum(bloodGroups).optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  sort: z.enum(['firstName', 'lastName', 'registeredAt', 'dateOfBirth']).default('registeredAt'),
  order: z.enum(['asc', 'desc']).default('desc'),
});

export const addMedicalRecordSchema = z.object({
  record: medicalRecordSchema,
});
