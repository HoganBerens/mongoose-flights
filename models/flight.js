const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const destinationSchema = new Schema({
  airport: {
    type: String,
    enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
    required: true,
  },
  arrival: { type: Date, required: true },
});

const flightSchema = new Schema({
  airline: { type: String, enum: ['American', 'Southwest', 'United'] },
  airport: {
    type: String,
    enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
    default: 'DEN',
  },
  flightNo: { type: Number, require: true, min: 10, max: 9999 },
  depart: { type: Date },
  destinations: [destinationSchema],
  tickets: { type: Array },
});

module.exports = mongoose.model('Flight', flightSchema);
