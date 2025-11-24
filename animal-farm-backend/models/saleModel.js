const pool = require('../db/db');

const addSale = async (
  batch_id,
  buyer_id,
  quantity,
  price_per_unit,
  total_price,
  sale_date,
  notes
) => {
  const [result] = await pool.query(
    `INSERT INTO sales 
     (batch_id, buyer_id, quantity, price_per_unit, total_price, sale_date, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [batch_id, buyer_id, quantity, price_per_unit, total_price, sale_date, notes]
  );
  return result.insertId;
};

const getSalesByBatch = async (batch_id) => {
  const [rows] = await pool.query(
    `SELECT 
      s.id,
      s.batch_id,
      s.quantity,
      s.price_per_unit,
      s.total_price,
      s.sale_date,
      s.notes,
      b.name AS buyer_name,
      b.phone AS buyer_phone
     FROM sales s
     JOIN buyers b ON s.buyer_id = b.id
     WHERE s.batch_id = ?
     ORDER BY s.sale_date DESC`,
    [batch_id]
  );
  return rows;
};


module.exports = {
  addSale,
  getSalesByBatch,
};
