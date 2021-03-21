import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

import menuRoutes from './routes/menuRoutes.js';

dotenv.config();

connectDB();

const app = express();

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/menus', menuRoutes);

const PORT = process.envPORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} monde on port ${PORT}`.yellow
      .bold
  )
);
