const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const env = process.env.NODE_ENV || 'development';
const configPath = path.join(__dirname, '..', '..', 'config/mongoConfig.json');
const config = require(configPath)[env];
const basename = path.basename(__filename);

const { host, port, database } = config;

mongoose
  .connect(`mongodb://${host}:${port}/${database}`)
  .then(() => console.log(`Connection to DB <<< ${database} >>> is Ok`))
  .catch((err) => {
    console.log(err);
    // process.exit(1);
  });

mongoose.set('debug', env === 'development');

const db = {};

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file));
    db[model.modelName] = model;
  });

db.mongoose = mongoose;

module.exports = db;
