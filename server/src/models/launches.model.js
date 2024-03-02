const launches = require("./launches.mongo");
const planets = require("./planets.mongo");

const launch = {
  flightNumber: 100,
  mission: "Initial Mars mission",
  rocket: "Super Rocket VII",
  launchDate: new Date("December 27, 2030"),
  destination: "Kepler-1652 b",
  customers: ["NASA", "Dzika prasa", "Timon & Pumba"],
  upcoming: true,
  success: true,
};

saveLaunch(launch);

function existsLaunchWithId(id) {
  return launches.has(id);
}

async function getLatestFlightNumber() {
  const latestLaunch = await launches.findOne().sort("-flightNumber");

  if (!latestLaunch) return 100;

  return latestLaunch.flightNumber;
}

async function getAllLaunches() {
  return await launches.find({});
}

async function saveLaunch(launch) {
  const planet = await planets.findOne({ keplerName: launch.destination });

  if (!planet) throw new Error("Planet not found");

  return await launches.updateOne(
    { flightNumber: launch.flightNumber },
    launch,
    { upsert: true }
  );
}

async function scheduleNewLaunch(launch) {
  const latestLaunchNumber = (await getLatestFlightNumber(launch)) + 1;

  const newLaunch = Object.assign(launch, {
    upcoming: true,
    success: true,
    flightNumber: latestLaunchNumber,
    customers: ["NASA", "YodaOne"],
  });

  await saveLaunch(newLaunch);
}

function abortLaunch(id) {
  const aborted = launches.get(id);
  aborted.upcoming = false;
  aborted.success = false;

  return aborted;
}

module.exports = {
  existsLaunchWithId,
  getAllLaunches,
  abortLaunch,
  scheduleNewLaunch,
};
