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

[
  {
    title: 'Deciding to study software development',
    textBody: 'I enjoy a lot working with computers. And it seems that there\'s plenty of well paid jobs.\n Lately I am thinking a lot about it',
    journaledDate: '21-03-2023'
  }
];
