import express from 'express';
import { Response } from 'express';
import patientsService from '../services/patientService';
import { NonSensitivePatientEntry } from '../types';
import NewEntrySchema from "../utils";
import { z } from 'zod';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatientEntry[]>) => {
  res.send(patientsService.getEntries());
});

router.post('/', (req, res) => {
    try {
        const newPatientEntry = NewEntrySchema.parse(req.body);
        const addedPatient = patientsService.addEntry(newPatientEntry);
        res.json(addedPatient);
    } catch (error: unknown) {
        if (error instanceof z.ZodError) {
            res.status(400).send({ error: error.issues });
          } else {
            res.status(400).send({ error: 'unknown error' });
          }
    }
});

router.get('/:id', (req, res) => {
    const patient = patientsService.getPatient(req.params.id);
    if (patient) {
        res.send(patient);
    } else {
        res.sendStatus(404);
    }
});

export default router;