import { Router } from 'express';
export const labRoutes = Router();
labRoutes.post('/order', (req, res) => { const order = { id: `LAB-${Date.now()}`, ...req.body, status: 'pending', orderedAt: new Date() }; res.status(201).json({ success: true, data: order }); });
labRoutes.patch('/:id/results', (req, res) => res.json({ success: true, data: { id: req.params.id, results: req.body.results, status: 'completed', completedAt: new Date() } }));
