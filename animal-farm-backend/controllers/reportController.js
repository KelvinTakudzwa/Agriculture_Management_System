const reportModel = require('../models/reportModel');

const getBatchReport = async (req, res) => {
  try {
    const batchId = req.params.id;
    const report = await reportModel.getBatchReport(batchId);
    res.json(report);
  } catch (error) {
    console.error("Error generating batch report:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getBatchReport };
