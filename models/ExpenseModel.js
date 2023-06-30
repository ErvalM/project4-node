const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  date: Date,
  expenseName: String,
  expenseDuration: String,
  expenseAmount: Number,
  profit: Number,
  deleted: { type: Boolean, default: false },
}, { collection: 'expensesDb' });

const ExpenseModel = mongoose.model('Expense', expenseSchema);

module.exports = ExpenseModel;