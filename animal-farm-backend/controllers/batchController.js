const batchModel = require('../models/batchModel');

const createBatch = async (req, res) => {
  try {
    const { user_id, animal_type_id, quantity, start_date, notes } = req.body;

    if (!user_id || !animal_type_id || !quantity || !start_date) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const batchId = await batchModel.createBatch(user_id, animal_type_id, quantity, start_date, notes);
    res.status(201).json({ success: true, message: 'Batch created successfully', batchId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error creating batch' });
  }
};

const getBatchesByUserAndAnimal = async (req, res) => {
  try {
    // const userId = req.user.userId; // from auth middleware
    const { animal_type_id } = req.params;

    const batches = await batchModel.getBatchesByUserAndAnimal( animal_type_id);
    res.status(200).json({ success: true, batches });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching batches' });
  }
};


module.exports = {
  getBatchesByUserAndAnimal,
  createBatch,
};
