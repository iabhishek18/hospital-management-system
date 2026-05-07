import { Router } from 'express';
import { validate } from '../../middleware/validate';
import { createPatientSchema, updatePatientSchema, patientQuerySchema, addMedicalRecordSchema } from './patient.schema';
import * as controller from './patient.controller';

export const patientRoutes = Router();

patientRoutes.get('/', validate({ query: patientQuerySchema }), controller.list);
patientRoutes.post('/', validate({ body: createPatientSchema }), controller.create);
patientRoutes.get('/:id', controller.getById);
patientRoutes.patch('/:id', validate({ body: updatePatientSchema }), controller.update);
patientRoutes.delete('/:id', controller.deactivate);
patientRoutes.post('/:id/medical-records', validate({ body: addMedicalRecordSchema }), controller.addMedicalRecord);
