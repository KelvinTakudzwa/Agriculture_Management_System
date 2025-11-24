// controllers/animalController.js
const animalModel = require('../models/animalModel');

const getAnimalTypes = async (req, res) => {
  try {
    const animals = await animalModel.getAllAnimalTypes();
    res.status(200).json({ success: true, animals });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to fetch animal types' });
  }
};



module.exports = {
  getAnimalTypes,
};
