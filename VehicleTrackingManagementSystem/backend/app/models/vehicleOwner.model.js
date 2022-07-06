const mongoose = require("mongoose");
const Joi = require('joi');
const mongoosePaginate = require('mongoose-paginate-v2');

/**
 * @swagger
 * definitions:
 *   VehicleCarOwner:
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

var schema = mongoose.Schema({
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
    unique: true,
    required: true,
  }
}, {
  timestamps: true
});
schema.plugin(mongoosePaginate);

const Model = mongoose.model("vehicleOwner", schema);

module.exports.VehicleCarOwner = Model;
module.exports.validateVehicleCarOwner = (body) => {
  return Joi.object({
    carOwner: Joi.string().required(),
    vehicle: Joi.string().required(),
    vehiclePlateNumber: Joi.string().required()
  }).validate(body);
};