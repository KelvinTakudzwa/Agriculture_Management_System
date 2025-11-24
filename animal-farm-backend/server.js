const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const pool = require('./db/db');
const app = express();
const authRoutes = require('./routes/authRoutes');
const animalRoutes = require('./routes/animalRoutes');
const batchRoutes = require('./routes/batchRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const deathRoutes = require('./routes/deathRoutes');
const saleRoutes = require('./routes/saleRoutes');
const buyerRoutes = require('./routes/buyerRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const reportRoutes = require('./routes/reportRoutes'); 
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route4
app.get('/', (req, res) => {
  res.send('Animal Farm Backend API Running By Takudzwa Mukaro');
});

//routes
app.use('/api/auth', authRoutes);
app.use('/api/animals', animalRoutes);
app.use('/api/batches', batchRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/deaths', deathRoutes);
app.use('/api/sales', saleRoutes);
app.use('/api/buyers', buyerRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api', reportRoutes);





app.get('/test-db', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT NOW() AS now');
    res.json({ success: true, time: rows[0].now });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

//error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: err.message });
})


// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console
});
