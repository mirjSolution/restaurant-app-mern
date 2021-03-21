import express from 'express';
import dotenv from 'dotenv';

import connectDB from './config/db.js';

import menus from './data/menus.js';

dotenv.config();

connectDB();

const app = express();

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.get('/api/menus', (req, res) => {
  res.json(menus);
});

app.get('/api/menus/:id', (req, res) => {
  const menu = menus.find((p) => p._id === req.params.id);
  res.json(menu);
});

const PORT = process.envPORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} monde on port ${PORT}`.yellow
      .bold
  )
);
