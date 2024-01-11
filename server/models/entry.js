const mongoose = require('mongoose');
const lifeAspectsPath = require('./lifeAspect');

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
  lifeAspects: lifeAspectsPath,
  tags: {
    type: [String],
    default: []
  }
},
  { timestamps: true }
);

const Entry = mongoose.model('Entry', EntrySchema);

module.exports = Entry;
