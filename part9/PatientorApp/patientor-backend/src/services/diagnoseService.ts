import diagnosesData from '../../data/diagnoses';
import { DiagnoseEntry } from '../types';

const diagnoses: DiagnoseEntry[] = diagnosesData;

const getEntries = (): DiagnoseEntry[] => {
    return diagnoses;
};

export default {
    getEntries
};