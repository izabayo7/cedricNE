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
 *       carOwner:
 *         type: string
 *       vehicle:
 *         type: string
 *       vehiclePlateNumber:
 *         type: string
 *     required:
 *       - carOwner
 *       - vehicle
 *       - vehiclePlateNumber
 */

var schema = mongoose.Schema(
  {
    carOwner: {
      type: String,
      required: true,
      ref: "carOwner"
    },
    vehicle: {
      type: String,
      required: true,
      ref: "vehicle"
    },
    vehiclePlateNumber: {
      type: String,
      unique:true,
      required: true,
    }
  },
  { timestamps: true }
);

const Model = mongoose.model("vehicle", schema);

module.exports.Vehicle = Model;
module.exports.validateVehicle = (body) => {
  return Joi.object({
    carOwner: Joi.string().required(),
    vehicle: Joi.string().required(),
    vehiclePlateNumber: Joi.string().required()
  }).validate(body);
};
