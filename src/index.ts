import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { patientRoutes } from './routes/patients';
import { appointmentRoutes } from './routes/appointments';
import { billingRoutes } from './routes/billing';
import { staffRoutes } from './routes/staff';
import { pharmacyRoutes } from './routes/pharmacy';
import { labRoutes } from './routes/lab';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/patients', patientRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/billing', billingRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/pharmacy', pharmacyRoutes);
app.use('/api/lab', labRoutes);

app.get('/health', (_, res) => res.json({ status: 'ok' }));
app.listen(process.env.PORT || 5000, () => console.log('HMS running on port 5000'));
