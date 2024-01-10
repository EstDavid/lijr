const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
    // TODO: Implement unique validator
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
    required: false
  },
  // TODO: Add references to Entries and LifeAspects
  // Entries: {
  //   type: Number,
  //   default: 0
  // },
  // LifeAspects: {
  //   type: [mongoose.Schema.Types.ObjectId],
  //   default: []
  // }
},
  { timestamps: true }
);

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;