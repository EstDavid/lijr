const mongoose = require('mongoose');
const { genericAspectSchema } = require('.');

const relationshipAspectSchema = new mongoose.Schema({
  relationshipType: {
    type: String,
    required: true
  },
  nameOfPerson: {
    type: String,
    required: true
  },
  userIdOfPerson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

relationshipAspectSchema.add(genericAspectSchema);

const RelationshipAspect = mongoose.model('RelationshipAspect', relationshipAspectSchema);

module.exports = RelationshipAspect;
