import express from 'express';
import cors from 'cors';
import dicomRoutes from './routes/dicom.routes.js';
import docsRoutes from './routes/docs.routes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/dicom', dicomRoutes);
app.use('/api/docs', docsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: err.message });
});

export default app; 