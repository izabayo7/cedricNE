const mongoose = require("mongoose");
const Joi = require('joi');
const mongoosePaginate = require('mongoose-paginate-v2');

/**
 * @swagger
 * definitions:
 *   Votes:
 *     properties:
 *       _id:
 *         type: string
 *       candidate:
 *         type: string
 *       user:
 *         type: string
 *     required:
 *       - candidate
 *       - user
 */

var schema = mongoose.Schema({
  candidate: {
    type: String,
    required: true,
    ref: "candidate"
  },
  user: {
    type: String,
    required: true,
    ref: "user"
  }
}, {
  timestamps: true
});
schema.plugin(mongoosePaginate);

const Model = mongoose.model("votes", schema);

module.exports.Votes = Model;
module.exports.validateVotes = (body) => {
  return Joi.object({
    candidate: Joi.string().required(),
    user: Joi.string().required()
  }).validate(body);
};