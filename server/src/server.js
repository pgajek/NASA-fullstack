const http = require("http");
const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

const MONGO_URL = process.env.MONGO_URL;

const { loadPlanetsData } = require("./models/planets.model");

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function startServer() {
  await mongoose.connect(MONGO_URL);
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`Server listen on port ${PORT}`);
  });
}

startServer();
