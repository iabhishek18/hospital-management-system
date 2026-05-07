import { Router, Request, Response } from 'express';
export const pharmacyRoutes = Router();
const medicines: any[] = [
  { id: 'MED-001', name: 'Paracetamol 500mg', category: 'Analgesic', stock: 500, price: 5, manufacturer: 'Sun Pharma', expiryDate: '2025-12-31' },
  { id: 'MED-002', name: 'Amoxicillin 250mg', category: 'Antibiotic', stock: 200, price: 15, manufacturer: 'Cipla', expiryDate: '2025-06-30' },
];

pharmacyRoutes.get('/', (_req: Request, res: Response) => res.json({ success: true, data: medicines }));
pharmacyRoutes.post('/dispense', (req: Request, res: Response) => {
  const { patientId, prescriptions } = req.body;
  const dispensed: any[] = [];
  for (const rx of prescriptions) {
    const med = medicines.find(m => m.id === rx.medicineId);
    if (!med || med.stock < rx.quantity) continue;
    med.stock -= rx.quantity;
    dispensed.push({ ...rx, medicineName: med.name, totalCost: med.price * rx.quantity });
  }
  res.json({ success: true, data: { patientId, dispensed, dispensedAt: new Date() } });
});
