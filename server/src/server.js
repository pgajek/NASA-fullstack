const http = require("http");
const app = require("./app");
const { loadPlanetsData } = require("./models/planets.model");
const { connectDatabase } = require("./services/mongo");

require("dotenv").config();

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  await connectDatabase();
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`Server listen on port ${PORT}`);
  });
}

startServer();
