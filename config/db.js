const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ssl: true
    });
  } catch (err) {
    console.error(`Connection error: ${err}`);
  }
}

connectDB();

const db = mongoose.connection;

db.once("open", () => console.log("Connected to DB!"));
db.on("error", (err) => console.log(`Connection error: ${err}`));
