import { Router, Request, Response } from 'express';

export const appointmentRoutes = Router();
const appointments: any[] = [];

appointmentRoutes.post('/', (req: Request, res: Response) => {
  const { patientId, doctorId, date, time, type, notes } = req.body;
  const conflict = appointments.find(a => a.doctorId === doctorId && a.date === date && a.time === time && a.status !== 'cancelled');
  if (conflict) return res.status(409).json({ error: 'Time slot not available' });
  const appt = { id: `APT-${Date.now()}`, patientId, doctorId, date, time, type, notes, status: 'scheduled', createdAt: new Date() };
  appointments.push(appt);
  res.status(201).json({ success: true, data: appt });
});

appointmentRoutes.get('/doctor/:doctorId', (req: Request, res: Response) => {
  const { date } = req.query;
  let filtered = appointments.filter(a => a.doctorId === req.params.doctorId);
  if (date) filtered = filtered.filter(a => a.date === date);
  res.json({ success: true, data: filtered.sort((a: any, b: any) => a.time.localeCompare(b.time)) });
});

appointmentRoutes.patch('/:id/status', (req: Request, res: Response) => {
  const appt = appointments.find(a => a.id === req.params.id);
  if (!appt) return res.status(404).json({ error: 'Appointment not found' });
  appt.status = req.body.status;
  res.json({ success: true, data: appt });
});
