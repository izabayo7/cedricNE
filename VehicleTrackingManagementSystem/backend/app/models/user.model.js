const mongoose = require("mongoose");
const Joi = require('joi');


/**
 * @swagger
 * definitions:
 *   User:
 *     properties:
 *       _id:
 *         type: string
 *       names:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 *       phone:
 *         type: string
 *       nationalId:
 *         type: string
 *     required:
 *       - names
 *       - email
 *       - password
 *       - phone
 *       - nationalId
 */

var schema = mongoose.Schema(
  {
    names: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phone: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    nationalId: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

const Model = mongoose.model("user", schema);
module.exports.NationalIdPattern = /(?<!\d)\d{16}(?!\d)/;

module.exports.User = Model;
module.exports.validateUser = (body) => {
  return Joi.object({
    names: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(), // validate phone
    password: Joi.string().required(),
    nationalId: Joi.string().pattern(NationalIdPattern).length(16).required(),
  }).validate(body);
};

module.exports.validateUserLogin = (body) => {
  return Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }).validate(body);
};
