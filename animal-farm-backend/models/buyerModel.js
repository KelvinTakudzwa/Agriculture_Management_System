const pool = require('../db/db');

// Add new buyer
const addBuyer = async (name, phone, address) => {
  const [result] = await pool.query(
    'INSERT INTO buyers (name, phone, address) VALUES (?, ?, ?)',
    [name, phone, address]
  );
  return result.insertId;
};

// Get all buyers
const getAllBuyers = async () => {
  const [rows] = await pool.query('SELECT * FROM buyers');
  return rows;
};

// Find buyer by name and phone
const findBuyerByNameAndPhone = async (name, phone) => {
  const [rows] = await pool.query(
    'SELECT * FROM buyers WHERE name = ? AND phone = ? LIMIT 1',
    [name, phone]
  );
  return rows[0]; // returns undefined if not found
};

module.exports = {
  addBuyer,
  getAllBuyers,
  findBuyerByNameAndPhone,
};
