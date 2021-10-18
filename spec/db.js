const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongodb;

async function connectDb() {
  mongodb = await MongoMemoryServer.create();

  const uri = await mongodb.getUri();
  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  };

  await mongoose.connect(uri, mongooseOpts);
}

async function disconnectDb() {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongodb.stop();
}

module.exports = { connectDb, disconnectDb };
