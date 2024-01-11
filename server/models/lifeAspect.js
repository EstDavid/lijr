const mongoose = require('mongoose');

const lifeAspectsPath = {
  genericAspects: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'GenericAspect',
  },
  relationships: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'RelationshipAspect',
  }
};

module.exports = lifeAspectsPath;