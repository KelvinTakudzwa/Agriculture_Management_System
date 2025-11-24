const expenseModel = require('../models/expenseModel');

const addExpense = async (req, res) => {
  try {
    const { batch_id, category, amount, description } = req.body;

    if (!batch_id || !category || !amount) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const expenseId = await expenseModel.addExpense(batch_id, category, amount, description || '');
    res.status(201).json({ success: true, message: 'Expense added', expenseId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error adding expense' });
  }
};

const getExpensesByBatch = async (req, res) => {
  try {
    const { batch_id } = req.params;

    const expenses = await expenseModel.getExpensesByBatch(batch_id);
    res.status(200).json({ success: true, expenses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching expenses' });
  }
};

module.exports = {
  addExpense,
  getExpensesByBatch,
};
