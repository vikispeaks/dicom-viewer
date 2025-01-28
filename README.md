# DICOM Viewer with Patient Information System

A modern web-based DICOM viewer with integrated patient information management system. This application provides a comprehensive solution for viewing medical images and accessing patient clinical data through a unified interface.

## Features

### DICOM Viewer
- 🖼️ Advanced DICOM image viewing capabilities
- 🔧 Image manipulation tools:
  - Window/Level adjustment
  - Pan and Zoom
  - Image inversion
  - Horizontal and vertical flip
  - 90-degree rotation
- 📏 Measurement tools:
  - Length measurement
  - Angle measurement
- 🔄 Real-time image information display
- 📊 DICOM tag information panel

### Patient Information Management
- 📋 Patient brief information
- 📝 Clinical notes management
- 🏥 Problem list tracking
- 🔬 Laboratory results viewing
- ⚕️ Allergy information

## Technical Stack

- **Frontend**:
  - HTML5/CSS3/JavaScript
  - Cornerstone.js for DICOM viewing
  - Modern responsive design
  - Real-time updates

- **Backend**:
  - Node.js with Express
  - FHIR-compliant patient data management
  - RESTful API architecture
  - Swagger/OpenAPI documentation

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/dicom-viewer.git
cd dicom-viewer
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

4. Access the application:
- Main application: `http://localhost:3000`
- API documentation: `http://localhost:3000/api/docs`

### Configuration

Create a `.env` file in the root directory with the following variables:
```env
PORT=3000
FHIR_BASE_URL=your_fhir_server_url
```

## API Documentation

The API is fully documented using OpenAPI/Swagger. Key endpoints include:

### DICOM Endpoints
- `GET /api/dicom/files` - List available DICOM files
- `POST /api/dicom/upload` - Upload DICOM file
- `GET /api/dicom/local/{fileId}` - Retrieve local DICOM image
- `GET /api/dicom/wado-uri` - WADO-URI protocol support
- `GET /api/dicom/studies/{...}` - WADO-RS protocol support

### Patient Information Endpoints
- `GET /api/patient/{patientId}` - Get patient information
- `GET /api/patient/{patientId}/clinical-notes` - Get clinical notes
- `GET /api/patient/{patientId}/problem-list` - Get problem list
- `GET /api/patient/{patientId}/lab-results` - Get lab results
- `GET /api/patient/{patientId}/allergies` - Get allergies

## Usage

### DICOM Viewer
1. Select a DICOM file from the dropdown menu
2. Use the toolbar buttons to manipulate the image:
   - W/L: Window/Level adjustment
   - Pan: Move the image
   - Zoom: Zoom in/out
   - Length: Measure distances
   - Angle: Measure angles
3. View image information in the side panel

### Patient Information
1. Enter patient ID to load patient information
2. Navigate through different sections:
   - Clinical Notes
   - Problem List
   - Lab Results
   - Allergies

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Cornerstone.js](https://cornerstonejs.org/) for DICOM viewing capabilities
- [FHIR](https://www.hl7.org/fhir/) for healthcare data standards
- All contributors and maintainers

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.

## Project Status

🚀 Active Development - We're continuously improving and adding new features! 