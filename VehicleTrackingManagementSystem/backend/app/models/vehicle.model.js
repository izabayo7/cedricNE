const mongoose = require("mongoose");
const Joi = require('joi');
const { NationalIdPattern } = require("./Vehicle.model");

/**
 * @swagger
 * definitions:
 *   Vehicle:
 *     properties:
 *       _id:
 *         type: string
 *       chasisNumber:
 *         type: string
 *       manufactureCompany:
 *         type: string
 *       manufactureYear:
 *         type: number
 *       price:
 *         type: number
 *       modelName:
 *         type: string
 *     required:
 *       - chasisNumber
 *       - manufactureCompany
 *       - manufactureYear
 *       - price
 *       - modelName
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
