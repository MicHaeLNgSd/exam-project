const { MulterError } = require('multer');
const BadRequestError = require('../errors/BadRequestError');

module.exports = (err, req, res, next) => {
  if (err instanceof MulterError) {
    return next(new BadRequestError('Invalid file(s)'));
  }
  next(err);
};
