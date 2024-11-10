const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const roomRoutes = require('./modules/rooms/routes/roomRoutes');

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api/rooms', roomRoutes);

module.exports = app;
