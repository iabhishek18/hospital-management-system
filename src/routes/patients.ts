import { Router, Request, Response } from 'express';
import { z } from 'zod';

export const patientRoutes = Router();

const patientSchema = z.object({
  firstName: z.string().min(1), lastName: z.string().min(1), dateOfBirth: z.string(), gender: z.enum(['male', 'female', 'other']),
  phone: z.string().min(10), email: z.string().email().optional(), address: z.string(), bloodGroup: z.string().optional(),
  emergencyContact: z.object({ name: z.string(), phone: z.string(), relation: z.string() }).optional(),
  medicalHistory: z.array(z.object({ condition: z.string(), diagnosedDate: z.string(), status: z.string() })).optional(),
  allergies: z.array(z.string()).optional(), insuranceId: z.string().optional(),
});

const patients: any[] = [];

patientRoutes.post('/', (req: Request, res: Response) => {
  const parsed = patientSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.issues });
  const patient = { id: `PAT-${Date.now()}`, ...parsed.data, registeredAt: new Date(), status: 'active' };
  patients.push(patient);
  res.status(201).json({ success: true, data: patient });
});

patientRoutes.get('/', (req: Request, res: Response) => {
  const { search, page = '1', limit = '20' } = req.query;
  let filtered = patients;
  if (search) { const q = (search as string).toLowerCase(); filtered = patients.filter(p => p.firstName.toLowerCase().includes(q) || p.lastName.toLowerCase().includes(q) || p.id.includes(q)); }
  const start = (Number(page) - 1) * Number(limit);
  res.json({ success: true, data: filtered.slice(start, start + Number(limit)), total: filtered.length });
});

patientRoutes.get('/:id', (req: Request, res: Response) => {
  const patient = patients.find(p => p.id === req.params.id);
  if (!patient) return res.status(404).json({ error: 'Patient not found' });
  res.json({ success: true, data: patient });
});
