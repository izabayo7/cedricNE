const mongoose = require("mongoose");
const Joi = require('joi');
const { NationalIdPattern } = require("./Vehicle.model");

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
