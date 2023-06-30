const express = require('express');
const LeadModel = require('../models/LeadModel');

const router = express.Router();

// GET request to fetch all leads
router.get('/contacts', async (request, response) => {
  try {
    const { deleted, name } = request.query;
    const query = {};

    if (deleted) {
      query.deleted = { $ne: true };
    }

    if (name) {
      query.name = name
    }

    const leads = await LeadModel.find(query);
    response.json(leads);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST request to create a new lead
router.post('/', async (request, response) => {
  try {
    const { name, phone, email, address, status } = request.body;
    const lead = await LeadModel.create({ name, phone, email, address, status });
    response.status(201).json(lead);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT request to update a lead by ID
router.put('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const { name, phone, email, address, status } = request.body;
    const updatedLead = await LeadModel.findByIdAndUpdate(
      id,
      { name, phone, email, address, status },
      { new: true }
    );
    if (updatedLead) {
      response.json(updatedLead);
    } else {
      response.status(404).json({ error: 'Lead not found' });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE request to delete a lead by ID (soft deletion)
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const deletedLead = await LeadModel.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    );
    if (deletedLead) {
      response.json({ message: 'Lead deleted successfully' });
    } else {
      response.status(404).json({ error: 'Lead not found' });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;