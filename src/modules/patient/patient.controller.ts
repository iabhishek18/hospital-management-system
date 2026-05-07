import { Request, Response, NextFunction } from 'express';
import * as patientService from './patient.service';

export function create(req: Request, res: Response, next: NextFunction): void {
  try {
    const patient = patientService.createPatient(req.body);
    res.status(201).json({ success: true, data: patient });
  } catch (error) {
    next(error);
  }
}

export function getById(req: Request, res: Response, next: NextFunction): void {
  try {
    const patient = patientService.getPatientById(req.params.id!);
    res.json({ success: true, data: patient });
  } catch (error) {
    next(error);
  }
}

export function update(req: Request, res: Response, next: NextFunction): void {
  try {
    const patient = patientService.updatePatient(req.params.id!, req.body);
    res.json({ success: true, data: patient });
  } catch (error) {
    next(error);
  }
}

export function deactivate(req: Request, res: Response, next: NextFunction): void {
  try {
    patientService.deactivatePatient(req.params.id!);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

export function addMedicalRecord(req: Request, res: Response, next: NextFunction): void {
  try {
    const patient = patientService.addMedicalRecord(req.params.id!, req.body.record);
    res.json({ success: true, data: patient });
  } catch (error) {
    next(error);
  }
}

export function list(req: Request, res: Response, next: NextFunction): void {
  try {
    const result = patientService.listPatients(req.query as never);
    res.json(result);
  } catch (error) {
    next(error);
  }
}
