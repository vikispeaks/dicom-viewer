const fhirConfig = {
    // Using Hapi FHIR test server as mock server
    baseUrl: process.env.FHIR_BASE_URL || 'https://hapi.fhir.org/baseR4',
    headers: {
        'Content-Type': 'application/fhir+json',
        'Accept': 'application/fhir+json'
    }
};

export default fhirConfig; 