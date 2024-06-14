const fs = require('fs');
const path = require('path');
const multer = require('multer');
const env = process.env.NODE_ENV || 'development';
const devFilePath = path.resolve(__dirname, '..', '..', '..', 'public');

const devImagesPath = path.resolve(devFilePath, 'images');
const imagesPath =
  env === 'production' ? '/var/www/html/images' : devImagesPath;
if (!fs.existsSync(imagesPath)) {
  fs.mkdirSync(imagesPath, {
    recursive: true,
  });
}
const storageImageFiles = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, imagesPath);
  },
  filename(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const devContestsPath = path.resolve(devFilePath, 'contests');
const contestsPath =
  env === 'production' ? '/var/www/html/contests' : devContestsPath;
if (!fs.existsSync(contestsPath)) {
  fs.mkdirSync(contestsPath, {
    recursive: true,
  });
}
const storageContestFiles = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, contestsPath);
  },
  filename(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const multerImagesInstanse = multer({ storage: storageImageFiles });
const multerContestsInstanse = multer({ storage: storageContestFiles });

module.exports.uploadAvatar = multerImagesInstanse.single('file');
module.exports.uploadContestFiles = multerContestsInstanse.array('files', 3);
module.exports.updateContestFile = multerContestsInstanse.single('file');
module.exports.uploadLogoFiles = multerContestsInstanse.single('offerData');
