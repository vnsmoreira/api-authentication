const mongoose = require('mongoose');

async function onMongoConnect(callback) {
  const mongoDBUri = process.env.MONGO_DB_URI;

  try {
    await mongoose.connect(mongoDBUri);
    callback();
  } catch (error) {
    console.log(error);
  }
}

module.exports = onMongoConnect;
