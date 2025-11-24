const db = require('../db/db');

const createBatch = async (user_id, animal_type_id, quantity, start_date, notes) => {
  const [result] = await db.query(
    `INSERT INTO batches (user_id, animal_type_id, quantity, start_date, notes) 
     VALUES (?, ?, ?, ?, ?)`,
    [user_id, animal_type_id, quantity, start_date, notes]
  );
  return result.insertId;
};

const getBatchesByUserAndAnimal = async ( animalTypeId) => {
  const [rows] = await db.query(
    `SELECT * FROM batches WHERE animal_type_id = ? ORDER BY start_date DESC`,
    [ animalTypeId]
  );
  return rows;
};

module.exports = {
  getBatchesByUserAndAnimal,
  createBatch,
};
