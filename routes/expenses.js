const express = require('express');
const ExpenseModel = require('../models/ExpenseModel');

const router = express.Router();

// GET request to fetch all expenses
router.get('/tracker', async (request, response) => {
  try {
    const { deleted, expenseName } = request.query;
    const query = {};

    if (deleted) {
      query.deleted = { $ne: true };
    }

    if (expenseName) {
      query.expenseName = expenseName;
    }

    const expenses = await ExpenseModel.find(query);
    response.json(expenses);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST request to create a new expense
router.post('/', async (request, response) => {
  try {
    const { expenseAmount, expenseName, expenseDuration, profit, date } = request.body;

    const parsedExpenseAmount = parseFloat(expenseAmount.replace('$', ''));

    const expense = await ExpenseModel.create({
      expenseAmount: parsedExpenseAmount,
      expenseName,
      expenseDuration,
      profit,
      date,
    });

    response.status(201).json(expense);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT request to update an expense by ID
router.put('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const { expenseAmount, expenseName, expenseDuration, profit } = request.body;
    const updatedExpense = await ExpenseModel.findByIdAndUpdate(
      id,
      { expenseAmount, expenseName, expenseDuration, profit },
      { new: true }
    );
    if (updatedExpense) {
      response.json(updatedExpense);
    } else {
      response.status(404).json({ error: 'Expense not found' });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE request to delete an expense by ID (soft deletion)
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const deletedExpense = await ExpenseModel.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    );
    if (deletedExpense) {
      response.json({ message: 'Expense deleted successfully' });
    } else {
      response.status(404).json({ error: 'Expense not found' });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;