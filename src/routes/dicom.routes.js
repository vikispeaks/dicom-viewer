import express from 'express';
import multer from 'multer';
import * as dicomController from '../controllers/dicom.controller.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// List available DICOM files
router.get('/files', dicomController.listFiles);

// WADO-URI endpoint
router.get('/wado-uri', dicomController.getImageWadoUri);

// WADO-RS endpoints
router.get('/studies/:studyInstanceUid/series/:seriesInstanceUid/instances/:sopInstanceUid', 
    dicomController.getImageWadoRs);

// Local file upload and retrieval
router.post('/upload', upload.single('dicomFile'), dicomController.uploadDicomFile);
router.get('/local/:fileId', dicomController.getLocalImage);

export default router; 