const mongoose = require('mongoose');

const lifeAspectsPath = {
  genericLifeAspects: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'GenericAspect',
  },
  relationships: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'RelationshipAspect',
  }
};

module.exports = lifeAspectsPath;