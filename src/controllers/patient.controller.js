import * as patientService from '../services/patient.service.js';

export const getPatientBrief = async (req, res) => {
    try {
        const brief = await patientService.getPatientBrief(req.query.patientId);
        res.json(brief);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getClinicalNotes = async (req, res) => {
    try {
        const notes = await patientService.getClinicalNotes(req.query.patientId);
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getProblemList = async (req, res) => {
    try {
        const problems = await patientService.getProblemList(req.query.patientId);
        res.json(problems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getLabResults = async (req, res) => {
    try {
        const results = await patientService.getLabResults(req.query.patientId);
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllergies = async (req, res) => {
    try {
        const allergies = await patientService.getAllergies(req.query.patientId);
        res.json(allergies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 