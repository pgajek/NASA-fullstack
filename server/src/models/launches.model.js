const launches = new Map();

const launch = {
  flightNumber: 100,
  mission: "Hakuna matata",
  rocket: "Super Rocket VII",
  launchDate: new Date("21-01-2029"),
  destination: "Hakuna matatuj",
  customers: ["NASA", "Dzika prasa", "Timon & Pumba"],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

function getAllLaunches() {
  return Array.from(launches.values());
}

module.exports = {
  getAllLaunches,
};
