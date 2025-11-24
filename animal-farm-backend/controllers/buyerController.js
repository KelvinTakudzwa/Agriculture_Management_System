const buyerModel = require('../models/buyerModel');

const addBuyer = async (req, res) => {
  try {
    const { name, phone, address } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and phone are required' });
    }

    const buyerId = await buyerModel.addBuyer(name, phone, address || '');
    res.status(201).json({ message: 'Buyer added successfully', buyer_id: buyerId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add buyer' });
  }
};

const getAllBuyers = async (req, res) => {
  try {
    const buyers = await buyerModel.getAllBuyers();
    res.json(buyers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve buyers' });
  }
};

module.exports = {
  addBuyer,
  getAllBuyers,
};
