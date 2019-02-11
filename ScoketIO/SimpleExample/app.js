const express = require('express');
const bodyParser = require('body-parser');

const feedRoutes = require('./routes/feed')

const app = express();

app.use(bodyParser.json()); // application/json

app.use('/feed', feedRoutes)

const server = app.listen(8080);
const io = require('./socket').init(server);
io.on('connection', socket => {
  console.log('Client Connected!!!');
});