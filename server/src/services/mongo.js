const mongoose = require("mongoose");
require("dotenv").config();
const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

const connectDatabase = async () => {
  await mongoose.connect(MONGO_URL);
};
const disconnectDatabase = async () => {
  await mongoose.disconnect();
};
module.exports = {
  connectDatabase,
  disconnectDatabase,
};
