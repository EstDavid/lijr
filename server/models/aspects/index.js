const mongoose = require('mongoose');

const genericLifeAspectSchema = new mongoose.Schema({
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  Entries: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Entry'
  },
  aspectType: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  Measurables: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Measurable'
  },
  visibility: {
    type: String,
    enum: ['public', 'private', 'friends'], // Assuming limited visibility options
    required: true
  }
},
  { timestamps: true }
);

const GenericLifeAspectModel = mongoose.model('GenericLifeAspect', genericLifeAspectSchema);

module.exports = {
  GenericLifeAspectModel,
  genericLifeAspectSchema
};
