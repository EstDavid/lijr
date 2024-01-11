const mongoose = require('mongoose');
const lifeAspectsPath = require('./lifeAspect');

const EntrySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  textBody: {
    type: String,
    required: true
  },
  journaledDate: {
    type: Date,
  },
  visibility: {
    type: String,
    enum: ['public', 'private', 'friends'], // Assuming limited visibility options
    default: 'private'
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
