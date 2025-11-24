const db = require('../db/db');

const addExpense = async (batch_id, category, amount, description) => {
  const [result] = await db.query(
    `INSERT INTO expenses (batch_id, category, amount, description)
     VALUES (?, ?, ?, ?)`,
    [batch_id, category, amount, description]
  );
  return result.insertId;
};

const getExpensesByBatch = async (batch_id) => {
  const [rows] = await db.query(
    `SELECT * FROM expenses WHERE batch_id = ? ORDER BY created_at DESC`,
    [batch_id]
  );
  return rows;
};

module.exports = {
  addExpense,
  getExpensesByBatch,
};
