const express = require('express');
const menus = require('./data/menus');

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

app.listen(5000, console.log('Server running on port 5000'));
