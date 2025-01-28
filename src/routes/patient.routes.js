import express from 'express';
import * as patientController from '../controllers/patient.controller.js';

const router = express.Router();

router.get('/brief', patientController.getPatientBrief);
router.get('/clinical-notes', patientController.getClinicalNotes);
router.get('/problem-list', patientController.getProblemList);
router.get('/lab-results', patientController.getLabResults);
router.get('/allergies', patientController.getAllergies);

export default router; 