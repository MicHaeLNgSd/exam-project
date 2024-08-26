const fsP = require('fs/promises');
const fs = require('fs');
const { LOG_DIR, LOG_TODAY_FILE } = require('../constants');
const path = require('path');
const cron = require('node-cron');

const dirPath = path.join(__dirname, '..', '..', LOG_DIR);
const filePath = path.join(dirPath, LOG_TODAY_FILE);

if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath, { recursive: true });
}

const getLoggerErrors = async (filePath) => {
  try {
    const fileText = await fsP.readFile(filePath, 'utf-8').catch(() => '');
    return JSON.parse(fileText || '[]');
  } catch (err) {
    console.error('Failed to parse log file:', err);
  }
};

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
    const errors = await getLoggerErrors(filePath);
    errors.push(logFormat(err));
    await fsP.writeFile(filePath, JSON.stringify(errors, null, 2));
  } catch (err) {
    console.error(err);
  }
};

const newLogFormat = ({ message, code, time }) => ({ message, code, time });

const logsToNewFile = async (newFilePath) => {
  try {
    const errors = await getLoggerErrors(filePath);
    if (errors.length) {
      const formatedErrors = errors.map((err) => newLogFormat(err));
      await fsP.writeFile(newFilePath, JSON.stringify(formatedErrors, null, 2));
      await fsP.writeFile(filePath, '');
    } else {
      console.log('There are no errors today');
    }
  } catch (err) {
    console.error(err);
  }
};

cron.schedule('0 20 * * *', () =>
  logsToNewFile(path.join(dirPath, `${Date.now()}.log`))
);

module.exports = logError;
