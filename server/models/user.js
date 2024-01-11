const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const lifeAspectSchema = require('./lifeAspect');

// email regex from https://www.slingacademy.com/article/how-to-validate-email-addresses-in-mongoose/
const emailRegex = /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    match: [emailRegex, 'email address not valid'],
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  birthDate: {
    type: Date,
  },
  entries: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Entry',
  },
  lifeAspects: lifeAspectSchema,
},
  { timestamps: true }
);

userSchema.plugin(uniqueValidator);

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;