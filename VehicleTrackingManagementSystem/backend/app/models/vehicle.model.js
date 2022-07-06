const mongoose = require("mongoose");
const Joi = require('joi');
const mongoosePaginate = require('mongoose-paginate-v2');

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

var schema = mongoose.Schema({
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
}, {
  timestamps: true
});
schema.plugin(mongoosePaginate);

const Model = mongoose.model("vehicle", schema);

module.exports.Vehicle = Model;
module.exports.validateVehicle = (body) => {
  return Joi.object({
    chasisNumber: Joi.string().required(),
    manufactureCompany: Joi.string().required(),
    manufactureYear: Joi.number().min(0).max(parseInt(new Date().getFullYear()+1)).required(),
    price: Joi.number().min(0).required(),
    modelName: Joi.string().required(),
  }).validate(body);
};