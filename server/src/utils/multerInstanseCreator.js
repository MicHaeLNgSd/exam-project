const fs = require('fs');
const multer = require('multer');

module.exports = (filesPath) => {
  if (!fs.existsSync(filesPath)) {
    fs.mkdirSync(filesPath, { recursive: true });
  }
  const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, filesPath);
    },
    filename(req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  });

  const multerInstanse = multer({ storage });
  return multerInstanse;
};
