import * as dicomService from '../services/dicom.service.js';

export const listFiles = async (req, res) => {
    try {
        const files = await dicomService.listDicomFiles();
        res.json(files);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getImageWadoUri = async (req, res) => {
    try {
        const { studyUID, seriesUID, objectUID, wadoURL } = req.query;
        const imageData = await dicomService.loadImageWadoUri(studyUID, seriesUID, objectUID, wadoURL);
        res.json(imageData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getImageWadoRs = async (req, res) => {
    try {
        const { studyInstanceUid, seriesInstanceUid, sopInstanceUid } = req.params;
        const imageData = await dicomService.loadImageWadoRs(
            studyInstanceUid,
            seriesInstanceUid,
            sopInstanceUid
        );
        res.json(imageData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const uploadDicomFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const fileData = await dicomService.processUploadedFile(req.file);
        res.json(fileData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getLocalImage = async (req, res) => {
    try {
        const { fileId } = req.params;
        const imageData = await dicomService.loadLocalImage(fileId);
        res.json(imageData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 