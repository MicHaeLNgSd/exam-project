const path = require('path');
const env = process.env.NODE_ENV || 'development';
const { DEV_FILES_PATH, PROD_FILES_PATH } = require('../constants');
const multerInstanseCreator = require('./multerInstanseCreator');

const filesPath = env === 'production' ? PROD_FILES_PATH : DEV_FILES_PATH;
const imagesPath = path.resolve(filesPath, 'images');
const contestsPath = path.resolve(filesPath, 'contests');

const multerImagesInstanse = multerInstanseCreator(imagesPath);
const multerContestsInstanse = multerInstanseCreator(contestsPath);

module.exports.uploadAvatar = multerImagesInstanse.single('file');
module.exports.uploadContestFiles = multerContestsInstanse.array('files', 3);
module.exports.updateContestFile = multerContestsInstanse.single('file');
module.exports.uploadLogoFiles = multerContestsInstanse.single('offerData');
