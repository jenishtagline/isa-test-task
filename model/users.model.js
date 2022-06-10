const { Schema, model } = require('mongoose');
const { userTypes, collectionsName } = require('../common/constant');

const userSchema = Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: [userTypes.ADMIN, userTypes.BASIC_USER],
    required: true
  }
}, { timestamp: true })

module.exports.userModel = model(collectionsName.USERS, userSchema, collectionsName.USERS)