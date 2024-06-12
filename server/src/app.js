const express = require('express');
const cors = require('cors');
const rootRouter = require('./router');
const handlerError = require('./handlerError/handler');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/public', express.static('public'));
app.use(rootRouter);
app.use(handlerError);

module.exports = app;
