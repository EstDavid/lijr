const mongoose = require('mongoose');

const measurableSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  type: {
    type: String,
    required: true
  },
  journaledDate: {
    type: Date,
  },
  score: {
    type: Number,
    min: 0,
    max: 5
  },
  vibration: {
    type: Number,
    min: 0,
    max: 1000
  },
  positiveNegative: Boolean,
  completed: Boolean,
  timePeriodStart: Date,
  timePeriodEnd: Date
},
  { timestamps: true }
);

const MeasurableModel = mongoose.model('Measurable', measurableSchema);

module.exports = MeasurableModel;