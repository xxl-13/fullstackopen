import express from 'express';
import { Response } from 'express';
import diagnosesService from '../services/diagnoseService';
import { DiagnoseEntry } from '../types';

const router = express.Router();

router.get('/', (_req, res: Response<DiagnoseEntry[]>) => {
  res.send(diagnosesService.getEntries());
});

export default router;