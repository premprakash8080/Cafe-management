import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import categoryRoutes from './routes/categoryRoutes.js';
import { sequelize } from './models/index.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/categories', categoryRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('Cafe API Backend is Running');
});

// Start server
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
  }
})();