const express = require('express');
const GoalModel = require('../models/GoalModel');

const router = express.Router();

// GET request to fetch all goals
router.get('/todo', async (request, response) => {
  try {
    const goals = await GoalModel.find({});
    response.json(goals);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST request to create a new goal
router.post('/', async (request, response) => {
  try {
    const { listingGoal, buyersGoal, listingProgress, buyersProgress } = request.body;
    const goal = await GoalModel.findOneAndUpdate({}, { listingGoal, buyersGoal, listingProgress, buyersProgress }, { upsert: true, new: true });
    response.status(201).json(goal);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT request to update a goal by ID
router.put('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const { listingGoal, buyersGoal, listingProgress, buyersProgress } = request.body;
    const updatedGoal = await GoalModel.findByIdAndUpdate(
      id,
      { listingGoal, buyersGoal, listingProgress, buyersProgress },
      { new: true }
    );
    if (updatedGoal) {
      response.json(updatedGoal);
    } else {
      response.status(404).json({ error: 'Goal not found' });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE request to delete a goal by ID
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const deletedGoal = await GoalModel.findByIdAndDelete(id);
    if (deletedGoal) {
      response.json({ message: 'Goal deleted successfully' });
    } else {
      response.status(404).json({ error: 'Goal not found' });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;