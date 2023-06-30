const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: String,
  phone: Number,
  email: String,
  address: String,
  status: String,
  deleted: { type: Boolean, default: false },
}, { collection: 'leadsDb' });

const LeadModel = mongoose.model('Lead', leadSchema);

module.exports = LeadModel;