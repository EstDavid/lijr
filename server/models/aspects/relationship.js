const mongoose = require('mongoose');
const { genericLifeAspectSchema } = require('.');

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

relationshipAspectSchema.add(genericLifeAspectSchema);

const RelationshipAspectModel = mongoose.model('RelationshipAspect', relationshipAspectSchema);

module.exports = RelationshipAspectModel;
