const fsP = require('fs/promises');
const fs = require('fs');
const { LOG_DIR, LOG_TODAY_FILE } = require('../constants');
const path = require('path');

const dirPath = path.join(__dirname, '..', '..', LOG_DIR);
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath, { recursive: true });
}

const filePath = path.join(dirPath, LOG_TODAY_FILE);

const logFormat = ({ message, code, stack }) => {
  return {
    message,
    time: Date.now(),
    code,
    stackTrace: stack,
  };
};

const logError = async (err) => {
  try {
    const fileText = await fsP.readFile(filePath, 'utf-8').catch(() => '');
    const oldData = fileText ? JSON.parse(fileText) : [];
    const newData = [...oldData, logFormat(err)];
    await fsP.writeFile(filePath, JSON.stringify(newData, null, 2));
  } catch (err) {
    console.error(err);
  }
};

module.exports = logError;
