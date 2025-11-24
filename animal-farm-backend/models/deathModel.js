const db = require('../db/db');

const addDeath = async (batch_id, quantity, reason, death_date) => {
  const [result] = await db.query(
    `INSERT INTO deaths (batch_id, quantity, reason, death_date)
     VALUES (?, ?, ?, ?)`,
    [batch_id, quantity, reason || '', death_date]
  );
  return result.insertId;
};

const getDeathsByBatch = async (batch_id) => {
  const [rows] = await db.query(
    `SELECT * FROM deaths WHERE batch_id = ? ORDER BY death_date DESC`,
    [batch_id]
  );
  return rows;
};

module.exports = {
  addDeath,
  getDeathsByBatch,
};
