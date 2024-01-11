const mongoose = require('mongoose');

const genericAspectSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  entries: {
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
  measurables: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Measurable'
  },
  visibility: {
    type: String,
    enum: ['public', 'private', 'friends'], // Assuming limited visibility options
    required: true
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
