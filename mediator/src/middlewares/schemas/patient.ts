import joi from "joi";

const createPatientSchema = joi.object({
  name: joi.string().required(),
  _id: joi.string().required(),
  id: joi.string().optional(),
  sex: joi.string().trim().regex(/^(male|female|other|unknown)$/).required(),
  // eslint-disable-next-line camelcase
  date_of_birth: joi.string().optional(),
});

module.exports = {
  createPatientSchema,
};
