const launches = new Map();

let latestFlightNumber = 100;

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

function addNewLaunch(launch) {
  latestFlightNumber++;
  launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      flightNumber: latestFlightNumber,
      customers: ["ZTM", "NASA"],
      upcoming: true,
      success: true,
    })
  );
}

module.exports = {
  getAllLaunches,
  addNewLaunch,
};
