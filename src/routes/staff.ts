import { Router } from 'express';
export const staffRoutes = Router();
staffRoutes.get('/', (_, res) => res.json({ success: true, data: [] }));
staffRoutes.post('/', (req, res) => res.status(201).json({ success: true, data: { id: `STAFF-${Date.now()}`, ...req.body } }));
