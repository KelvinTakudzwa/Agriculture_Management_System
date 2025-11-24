const deathModel = require('../models/deathModel');

const addDeath = async (req, res) => {
  try {
    console.log(req.body);
    const { batch_id, quantity, reason, death_date } = req.body;

    if (!batch_id || !quantity || !death_date) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const deathId = await deathModel.addDeath(batch_id, quantity, reason, death_date);
    res.status(201).json({ success: true, message: 'Death recorded', deathId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error recording death' });
  }
};

const getDeathsByBatch = async (req, res) => {
  try {
    const { batch_id } = req.params;

    const deaths = await deathModel.getDeathsByBatch(batch_id);
    res.status(200).json({ success: true, deaths });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching deaths' });
  }
};

module.exports = {
  addDeath,
  getDeathsByBatch,
};
