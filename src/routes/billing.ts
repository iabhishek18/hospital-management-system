import { Router, Request, Response } from 'express';

export const billingRoutes = Router();
const invoices: any[] = [];

billingRoutes.post('/generate', (req: Request, res: Response) => {
  const { patientId, items, discount = 0, insuranceCoverage = 0 } = req.body;
  const subtotal = items.reduce((sum: number, item: any) => sum + item.amount * item.quantity, 0);
  const discountAmount = subtotal * (discount / 100);
  const insuranceAmount = (subtotal - discountAmount) * (insuranceCoverage / 100);
  const total = subtotal - discountAmount - insuranceAmount;
  const invoice = { id: `INV-${Date.now()}`, patientId, items, subtotal, discount: discountAmount, insuranceCoverage: insuranceAmount, total, status: 'pending', createdAt: new Date(), dueDate: new Date(Date.now() + 30 * 86400000) };
  invoices.push(invoice);
  res.status(201).json({ success: true, data: invoice });
});

billingRoutes.get('/patient/:patientId', (req: Request, res: Response) => {
  const patientInvoices = invoices.filter(i => i.patientId === req.params.patientId);
  res.json({ success: true, data: patientInvoices });
});

billingRoutes.patch('/:id/pay', (req: Request, res: Response) => {
  const invoice = invoices.find(i => i.id === req.params.id);
  if (!invoice) return res.status(404).json({ error: 'Invoice not found' });
  invoice.status = 'paid';
  invoice.paidAt = new Date();
  invoice.paymentMethod = req.body.method;
  res.json({ success: true, data: invoice });
});
