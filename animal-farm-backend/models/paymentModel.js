const pool = require('../db/db');

const addPayment = async (sale_id, amount_paid, payment_method, payment_date) => {
  const [result] = await pool.query(
    `INSERT INTO payments (sale_id, amount_paid, payment_method, payment_date)
     VALUES (?, ?, ?, ?)`,
    [sale_id, amount_paid, payment_method, payment_date]
  );
  return result.insertId;
};

const getPaymentsByBatch = async (batch_id) => {
  const [rows] = await pool.query(
    `SELECT p.*, s.buyer_id, s.quantity, s.total_price 
     FROM payments p
     JOIN sales s ON p.sale_id = s.id
     WHERE s.batch_id = ?
     ORDER BY p.payment_date DESC`,
    [batch_id]
  );
  return rows;
};

module.exports = {
  addPayment,
  getPaymentsByBatch,
};

