const mongoose = require('mongoose');

const genericAspectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  aspectType: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  entries: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Entry'
  },
  measurables: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Measurable'
  },
  visibility: {
    type: String,
    enum: ['public', 'private', 'friends'], // Assuming limited visibility options
    default: 'private'
  },
  timePeriodStart: Date,
  timePeriodEnd: Date
},
  { timestamps: true }
);

const GenericAspect = mongoose.model('GenericAspect', genericAspectSchema);

module.exports = {
  GenericAspect,
  genericAspectSchema
};
