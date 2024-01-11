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

module.exports = lifeAspectSchema;