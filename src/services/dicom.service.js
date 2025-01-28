import dicomParser from 'dicom-parser';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Local File Implementation
const UPLOAD_DIR = path.join(__dirname, '../../uploads');

export const listDicomFiles = async () => {
    try {
        const files = await fs.readdir(UPLOAD_DIR);
        return files
            .filter(file => file.endsWith('.dcm'))
            .map(file => file.replace('.dcm', ''));
    } catch (error) {
        throw new Error(`Failed to list DICOM files: ${error.message}`);
    }
};

export const loadImageWadoUri = async (studyUID, seriesUID, objectUID, wadoURL) => {
    throw new Error('WADO-URI implementation not available in basic viewer mode');
};

export const loadImageWadoRs = async (studyInstanceUid, seriesInstanceUid, sopInstanceUid) => {
    throw new Error('WADO-RS implementation not available in basic viewer mode');
};

export const processUploadedFile = async (file) => {
    try {
        // Ensure upload directory exists
        await fs.mkdir(UPLOAD_DIR, { recursive: true });
        
        // Move file to permanent location
        const newPath = path.join(UPLOAD_DIR, `${file.filename}.dcm`);
        await fs.rename(file.path, newPath);
        
        return {
            fileId: file.filename,
            originalName: file.originalname,
            size: file.size
        };
    } catch (error) {
        throw new Error(`Failed to process uploaded file: ${error.message}`);
    }
};

export const loadLocalImage = async (fileId) => {
    try {
        const filePath = path.join(UPLOAD_DIR, `${fileId}.dcm`);
        
        // Check if file exists
        await fs.access(filePath);
        
        // Read the DICOM file
        const fileContent = await fs.readFile(filePath);
        
        // Return the file content as base64
        return {
            fileContent: fileContent.toString('base64'),
            contentType: 'application/dicom'
        };
    } catch (error) {
        throw new Error(`Failed to load local image: ${error.message}`);
    }
}; 