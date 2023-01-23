const axios = require('axios');
const {FHIR} = require('../../config');
const {url: fhirUrl, password: fhirPassword, username: fhirUsername} = FHIR;

async function createTask(task) {
  try {
    const options = {
      auth: {
        username: fhirUsername,
        password: fhirPassword,
      }
    };

    const res = await axios.get(`${fhirUrl}/Patient/${task.patientId}`, options);

    if (res.status !== 200) {
      return {status: res.status, data: res.data};
    }

    // todo => @ngoz to add task creation process.

    return {status: res.status, data: res.data};
  } catch (error) {
    // todo => replace with a logger.
    console.log(error);
    return {status: error.status, data: error.data };
  }
}

module.exports = {
  createTask,
};
