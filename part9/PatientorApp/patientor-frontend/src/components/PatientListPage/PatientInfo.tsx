import { Diagnosis, Patient } from '../../types';
import { useEffect, useState } from 'react';
import patientService from "../../services/patients";
import diagnosesService from "../../services/diagnoses";
import { useParams } from 'react-router-dom';
import { Transgender, Male, Female } from '@mui/icons-material'; 

const PatientInfo = () => {
    const [patient, setPatient] = useState<Patient | undefined>();
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
    const { id } = useParams<{ id: string }>();
    useEffect(() => {
        void patientService.getOne(id).then((patient) => {
            if (patient) {
                setPatient(patient);
            }
        });

        void diagnosesService.getAll().then((diagnoses) => {
            setDiagnoses(diagnoses);
        });

    }, [id]);
    if (!patient) {
        return null;
    }

    const GenderIcon = () => {
        switch (patient?.gender) {
            case "male":
                return <Male />;
            case "female":
                return <Female />;
            case "other":
                return <Transgender />;
            default:
                return null;
        }
    };

    return (
        <div>
        <h2>{patient.name} <GenderIcon/></h2>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
        <h2>Entries</h2>
        <ul>
            {patient.entries.map((entry, index) => (
                <li key={index}>
                    <p>{entry.date} {entry.description}</p>
                    <ul>
                        {entry.diagnosisCodes?.map((code, index) => (
                            <li key={index}>{code} {diagnoses.map(
                                (diagnosis) => diagnosis.code === code ? diagnosis.name : null
                            )}</li>
                        ))}
                    </ul>
                </li>
            ))}
        </ul>
        </div>
    ); 
};
export default PatientInfo; 