require('dotenv/config');

module.exports = {
  PORT: process.env.PORT || 6000,
  OPENHIM: {
    username: process.env.OPENHIM_USERNAME || 'interop@openhim.org',
    password: process.env.OPENHIM_PASSWORD || 'interop-password',
    apiURL: process.env.OPENHIM_API_URL || 'https://openhim-core:8080',
    trustSelfSigned: true
  },
  FHIR: {
    url: process.env.FHIR_URL || 'http://openhim-core:5001/fhir',
    username: process.env.FHIR_USERNAME || 'interop-client',
    password: process.env.FHIR_PASSWORD || 'interop-password',
  }
};