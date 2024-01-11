const mongoose = require('mongoose');

const lifeAspectSchema = require('./lifeAspect');

const EntrySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  journaledDate: {
    type: Date,
  },
  title: {
    type: String,
    required: true
  },
  textBody: {
    type: String,
    required: true
  },
  visibility: {
    type: String,
    enum: ['public', 'private', 'friends'], // Assuming limited visibility options
    required: true
  },
  lifeAspects: lifeAspectSchema,
  tags: {
    type: [String],
    default: []
  }
},
  { timestamps: true }
);

const EntryModel = mongoose.model('Entry', EntrySchema);

module.exports = EntryModel;
