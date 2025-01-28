import fhir from 'fhir';
import fhirConfig from '../config/fhir.config.js';

// Create FHIR client
const client = {
    baseUrl: fhirConfig.baseUrl,
    headers: fhirConfig.headers
};

export const getPatientBrief = async (patientId) => {
    try {
        const response = await fetch(`${client.baseUrl}/Patient/${patientId}`, {
            headers: client.headers
        });
        const patient = await response.json();

        const conditionResponse = await fetch(`${client.baseUrl}/Condition?patient=${patientId}&category=encounter-diagnosis`, {
            headers: client.headers
        });
        const conditions = await conditionResponse.json();

        // Parse FHIR response
        const latestCondition = conditions.entry?.[0]?.resource;
        return {
            patientName: `${patient.name?.[0]?.given?.[0]} ${patient.name?.[0]?.family}`,
            reason_for_study: latestCondition?.code?.text || 'No diagnosis recorded',
            status: latestCondition?.clinicalStatus?.coding?.[0]?.code || 'unknown'
        };
    } catch (error) {
        throw new Error('Failed to fetch patient brief');
    }
};

export const getClinicalNotes = async (patientId) => {
    try {
        const response = await fetch(`${client.baseUrl}/DocumentReference?patient=${patientId}&category=clinical-note`, {
            headers: client.headers
        });
        const notesBundle = await response.json();

        // Parse FHIR DocumentReference resources
        return notesBundle.entry?.map(entry => {
            const resource = entry.resource;
            return {
                date: resource.date,
                doctor: resource.author?.[0]?.display,
                note: resource.content?.[0]?.attachment?.data || resource.description,
                type: resource.type?.coding?.[0]?.display
            };
        }) || [];
    } catch (error) {
        throw new Error('Failed to fetch clinical notes');
    }
};

export const getProblemList = async (patientId) => {
    try {
        const response = await fetch(`${client.baseUrl}/Condition?patient=${patientId}&category=problem-list-item`, {
            headers: client.headers
        });
        const conditions = await response.json();

        // Parse FHIR Condition resources
        return conditions.entry?.map(entry => {
            const condition = entry.resource;
            return condition.code?.text || condition.code?.coding?.[0]?.display;
        }).filter(Boolean) || [];
    } catch (error) {
        throw new Error('Failed to fetch problem list');
    }
};

export const getLabResults = async (patientId) => {
    try {
        const response = await fetch(`${client.baseUrl}/Observation?patient=${patientId}&category=laboratory`, {
            headers: client.headers
        });
        const observations = await response.json();

        // Parse FHIR Observation resources
        const results = {};
        observations.entry?.forEach(entry => {
            const obs = entry.resource;
            const code = obs.code?.coding?.[0]?.display?.toLowerCase();
            if (code && obs.valueQuantity) {
                results[code] = {
                    value: obs.valueQuantity.value,
                    unit: obs.valueQuantity.unit,
                    date: obs.effectiveDateTime,
                    status: obs.status,
                    interpretation: obs.interpretation?.[0]?.coding?.[0]?.code
                };
            }
        });
        return results;
    } catch (error) {
        throw new Error('Failed to fetch lab results');
    }
};

export const getAllergies = async (patientId) => {
    try {
        const response = await fetch(`${client.baseUrl}/AllergyIntolerance?patient=${patientId}`, {
            headers: client.headers
        });
        const allergies = await response.json();

        // Parse FHIR AllergyIntolerance resources
        return allergies.entry?.map(entry => {
            const allergy = entry.resource;
            return {
                substance: allergy.code?.coding?.[0]?.display,
                status: allergy.clinicalStatus?.coding?.[0]?.code,
                severity: allergy.reaction?.[0]?.severity,
                onset: allergy.onsetDateTime,
                recordedDate: allergy.recordedDate
            };
        }) || [];
    } catch (error) {
        throw new Error('Failed to fetch allergies');
    }
}; 