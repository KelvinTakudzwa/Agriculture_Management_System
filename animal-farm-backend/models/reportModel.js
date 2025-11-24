const db = require('../db/db');

const getBatchReport = async (batchId) => {
  // Get batch info
  const [batchRows] = await db.query(
    `SELECT quantity FROM batches WHERE id = ?`,
    [batchId]
  );
  const batch = batchRows[0];
  if (!batch) throw new Error("Batch not found");

  // Deaths summary
  const [deathsRows] = await db.query(
    `SELECT SUM(quantity) AS total_deaths FROM deaths WHERE batch_id = ?`,
    [batchId]
  );
  const totalDeaths = Number(deathsRows[0]?.total_deaths) || 0;

  // Mortality rate
  const mortalityRate =
    batch.quantity > 0
      ? ((totalDeaths / batch.quantity) * 100).toFixed(2)
      : "0.00";

  // Expenses summary
  const [expensesRows] = await db.query(
    `SELECT SUM(amount) AS total_expenses FROM expenses WHERE batch_id = ?`,
    [batchId]
  );
  const totalExpenses = Number(expensesRows[0]?.total_expenses) || 0;

  const [expensesBreakdownRows] = await db.query(
    `SELECT category, SUM(amount) AS total 
     FROM expenses 
     WHERE batch_id = ? 
     GROUP BY category`,
    [batchId]
  );

  // Sales summary
  const [salesRows] = await db.query(
    `SELECT 
        SUM(quantity * price_per_unit) AS total_sales,
        AVG(price_per_unit) AS avg_price
     FROM sales 
     WHERE batch_id = ?`,
    [batchId]
  );

  const totalSales = Number(salesRows[0]?.total_sales) || 0;
  const avgPrice = salesRows[0]?.avg_price
    ? Number(salesRows[0].avg_price).toFixed(2)
    : "0.00";

  // Payments summary
  const [paymentsRows] = await db.query(
    `SELECT SUM(amount_paid) AS total_payments 
     FROM payments 
     WHERE sale_id IN (SELECT id FROM sales WHERE batch_id = ?)`,
    [batchId]
  );
  const totalPayments = Number(paymentsRows[0]?.total_payments) || 0;

  // ---- NEW: Detailed records ----
  const [salesDetails] = await db.query(
    `SELECT s.id, s.quantity, s.price_per_unit, s.total_price, s.sale_date, b.name AS buyer
     FROM sales s
     LEFT JOIN buyers b ON s.buyer_id = b.id
     WHERE s.batch_id = ?`,
    [batchId]
  );

  const [paymentsDetails] = await db.query(
    `SELECT p.id, p.amount_paid, p.payment_method, p.payment_date
     FROM payments p
     INNER JOIN sales s ON p.sale_id = s.id
     WHERE s.batch_id = ?`,
    [batchId]
  );

  const [deathsDetails] = await db.query(
    `SELECT id, quantity, reason, death_date
     FROM deaths
     WHERE batch_id = ?`,
    [batchId]
  );

  // Calculations
  const outstanding = totalSales - totalPayments;
  const profitOrLoss = totalSales - totalExpenses;

  return {
    batch_id: batchId,
    initial_quantity: batch.quantity,
    total_deaths: totalDeaths,
    mortality_rate: `${mortalityRate}%`,
    total_expenses: totalExpenses.toFixed(2),
    expenses_breakdown: (expensesBreakdownRows || []).map((row) => ({
      category: row.category,
      total: Number(row.total).toFixed(2),
    })),
    total_sales: totalSales.toFixed(2),
    average_sale_price: avgPrice,
    payments_received: totalPayments.toFixed(2),
    outstanding_balance: outstanding.toFixed(2),
    profit_or_loss: profitOrLoss.toFixed(2),

    // NEW: full detail sections
    sales: salesDetails.map((s) => ({
      id: s.id,
      buyer: s.buyer || "Unknown",
      quantity: s.quantity,
      price_per_unit: Number(s.price_per_unit).toFixed(2),
      total_price: Number(s.total_price).toFixed(2),
      sale_date: s.sale_date,
    })),

    payments: paymentsDetails.map((p) => ({
      id: p.id,
      payment_method: p.payment_method,
      amount_paid: Number(p.amount_paid).toFixed(2),
      payment_date: p.payment_date,
    })),

    deaths: deathsDetails.map((d) => ({
      id: d.id,
      quantity: d.quantity,
      reason: d.reason,
      death_date: d.death_date,
    })),
  };
};

module.exports = { getBatchReport };
