const express = require('express');
const { queryParser } = require('express-query-parser');
const cors = require('cors');
const rootRouter = require('./router');
const handlerError = require('./handlerError/handler');
const multerHandlerError = require('./handlerError/multerHandler');
const env = process.env.NODE_ENV || 'development';
const { DEV_FILES_PATH, PROD_FILES_PATH } = require('./constants');

const app = express();

const filesPath = env === 'production' ? PROD_FILES_PATH : DEV_FILES_PATH;

const queryParserConfigs = {
  parseNull: true,
  parseUndefined: true,
  parseBoolean: true,
  parseNumber: true,
};

app.use(cors());
app.use(express.json());
app.use(queryParser(queryParserConfigs));

app.use('/public', express.static(filesPath));
app.use('/api', rootRouter);
app.use(multerHandlerError);
app.use(handlerError);

module.exports = app;
