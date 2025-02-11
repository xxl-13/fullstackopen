import { NonSensitivePatientEntry, PatientEntry, NewPatientEntry } from "../types";
import patientsData from "../../data/patients";
import { v1 as uuid } from 'uuid';

const patients: PatientEntry[] = patientsData;

const getEntries = (): NonSensitivePatientEntry[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addEntry = (entry: NewPatientEntry): PatientEntry => {
    const id: string = uuid();
    const newPatientEntry = {
        id: id,
        ...entry,
        entries: []
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
};

const getPatient = (id: string): PatientEntry | undefined => {
    return patients.find(patient => patient.id === id);
};

export default {
  getEntries,
  addEntry,
  getPatient
};