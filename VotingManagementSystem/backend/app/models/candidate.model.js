const mongoose = require("mongoose");
const Joi = require('joi');
const mongoosePaginate = require('mongoose-paginate-v2');
const { NationalIdPattern } = require("./user.model");

/**
 * @swagger
 * definitions:
 *   Candidate:
 *     properties:
 *       _id:
 *         type: string
 *       names:
 *         type: string
 *       profilePicture:
 *         type: string
 *       gender:
 *         type: string
 *         enum: ['male','female']
 *       missionStatement:
 *         type: string
 *       nationalId:
 *         type: string
 *     required:
 *       - names
 *       - address
 *       - phone
 *       - nationalId
 */

var schema = mongoose.Schema({
  names: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
  },
  gender: {
    type: String,
    enum: ['male','female']
  },
  missionStatement: {
    type: String,
    required: true,
  },
  nationalId: {
    type: String,
    unique: true,
    required: true,
  },
}, {
  timestamps: true
});
schema.plugin(mongoosePaginate);

const Model = mongoose.model("candidate", schema);

module.exports.Candidate = Model;
module.exports.validateCandidate = (body) => {
  return Joi.object({
    names: Joi.string().required(),
    profilePicture: Joi.string(),
    gender: Joi.string().valid('male','female').required(),
    missionStatement: Joi.string().required(),
    nationalId: Joi.string().pattern(NationalIdPattern).length(16).required(),
  }).validate(body);
};