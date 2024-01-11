const mongoose = require('mongoose');

const lifeAspectSchema = new mongoose.Schema({
  genericLifeAspects: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'GenericLifeAspect',
  },
  relationships: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'RelationshipAspect',
  }
});

const journalEntrySchema = new mongoose.Schema({
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
  Tags: {
    type: [String],
    default: []
  }
},
  { timestamps: true }
);

const JournalEntryModel = mongoose.model('JournalEntry', journalEntrySchema);

module.exports = JournalEntryModel;
