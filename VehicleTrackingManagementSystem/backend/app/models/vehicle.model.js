const mongoose = require("mongoose");
const Joi = require('joi');
const { NationalIdPattern } = require("./Vehicle.model");
/**
 * Vehicle{
    id,
    chasisNo,
    manufactureCompany,
    manufactureYear,
    price,
    model name,
}
 */
var schema = mongoose.Schema(
  {
    chasisNumber: {
      type: String,
      required: true,
    },
    manufactureCompany: {
      type: String,
      required: true,
    },
    manufactureYear: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    modelName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Model = mongoose.model("vehicle", schema);

module.exports.Vehicle = Model;
module.exports.validateVehicle = (body) => {
  return Joi.object({
    chasisNumber: Joi.string().required(),
    manufactureCompany: Joi.string().required(),
    manufactureYear: Joi.string().required(),
    price: Joi.string().required(),
    modelName: Joi.string().required(),
  }).validate(body);
};
