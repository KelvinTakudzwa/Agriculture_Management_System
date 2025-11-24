const paymentModel = require('../models/paymentModel');

const addPayment = async (req, res) => {
  try {
    const { sale_id, amount_paid, payment_method, payment_date } = req.body;

    if (!sale_id || !amount_paid || !payment_method || !payment_date) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const paymentId = await paymentModel.addPayment(
      sale_id,
      amount_paid,
      payment_method,
      payment_date
    );

    res.status(201).json({ message: 'Payment added successfully', paymentId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add payment' });
  }
};
const getPaymentsByBatch = async (req, res) => {
  try {
    const { batch_id } = req.params;
    const payments = await paymentModel.getPaymentsByBatch(batch_id);
    res.status(200).json({ success: true, payments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching payments" });
  }
};

module.exports = {
  addPayment,
  getPaymentsByBatch,
};


