import { Patient } from '../patient/patient.types';

export interface Store {
  patients: Map<string, Patient>;
}

export const store: Store = {
  patients: new Map(),
};
