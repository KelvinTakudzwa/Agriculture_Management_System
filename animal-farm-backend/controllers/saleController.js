const saleModel = require('../models/saleModel');
const buyerModel = require('../models/buyerModel');

const addSale = async (req, res) => {
  try {
    const {
      batch_id,
      quantity,
      price_per_unit,
      total_price,
      sale_date,
      notes,
      buyer_name,
      buyer_phone,
      buyer_address
    } = req.body;

    if (!buyer_name || !buyer_phone) {
      return res.status(400).json({ error: 'Buyer name and phone are required' });
    }

    // 1. Find existing buyer
    let buyer = await buyerModel.findBuyerByNameAndPhone(buyer_name, buyer_phone);

    // 2. If not found, create new buyer
    if (!buyer) {
      const buyer_id = await buyerModel.addBuyer(buyer_name, buyer_phone, buyer_address || '');
      buyer = { id: buyer_id };
    }

    // 3. Add the sale with the buyer_id
    const saleId = await saleModel.addSale(
      batch_id,
      buyer.id,
      quantity,
      price_per_unit,
      total_price,
      sale_date,
      notes
    );

    res.status(201).json({ message: 'Sale recorded successfully', sale_id: saleId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add sale' });
  }
};

const getSalesByBatch = async (req, res) => {
  try {
    const { batch_id } = req.params;
    const sales = await saleModel.getSalesByBatch(batch_id);
    res.status(200).json({ success: true, sales });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching sales' });
  }
};

module.exports = {
  addSale,
  getSalesByBatch,
};
