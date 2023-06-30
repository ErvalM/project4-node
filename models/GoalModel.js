const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  listingGoal: Number,
  buyersGoal: Number,
  listingProgress: Number,
  buyersProgress: Number,
}, { collection: 'goalsDb' });

const GoalModel = mongoose.model('Goal', goalSchema);

module.exports = GoalModel;