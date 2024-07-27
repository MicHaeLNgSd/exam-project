const logError = require('../utils/logger');

module.exports = (err, req, res, next) => {
  logError(err);
  next(err);
};
