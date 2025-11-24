// models/animalModel.js
const db = require('../db/db');

const getAllAnimalTypes = async () => {
  const [rows] = await db.query('SELECT * FROM animal_types ORDER BY name ASC');
  return rows;
};

module.exports = {
  getAllAnimalTypes,
};
