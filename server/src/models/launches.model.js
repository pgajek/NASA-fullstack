const launches = require("./launches.mongo");
const planets = require("./planets.mongo");
require("dotenv").config();
const axios = require("axios");

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

const SPACEX_API_URL = process.env.SPACEX_API_URL;

async function findLaunch(filter) {
  return await launches.findOne(filter);
}

async function existsLaunchWithId(launchId) {
  return await findLaunch({ flightNumber: launchId });
}

async function populateLaunches() {
  try {
    const res = await axios.post(
      "https://api.spacexdata.com/v4/launches/query",
      {
        query: {},
        options: {
          pagination: false,
          populate: [
            {
              path: "rocket",
              select: {
                name: 1,
              },
            },
            {
              path: "payloads",
              select: {
                customers: 1,
              },
            },
          ],
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Launch data download failed");
    }

    const launchDocs = res.data.docs;

    for (const launchDoc of launchDocs) {
      const payloads = launchDoc["payloads"];
      const customers = payloads.flatMap((payload) => {
        return payload["customers"];
      });

      const launch = {
        flightNumber: launchDoc["flight_number"],
        mission: launchDoc["name"],
        rocket: launchDoc["rocket"]["name"],
        launchDate: launchDoc["date_local"],
        upcoming: launchDoc["upcoming"],
        success: launchDoc["success"],
        customers,
      };
      console.log(`${launch.flightNumber}, ${launch.mission}`);

      await saveLaunch(launch);
    }
  } catch (err) {
    console.error(err);
  }
}

async function loadLaunchesData() {
  const firstLaunch = await findLaunch({
    flightNumber: 1,
    rocket: "Falcon 1",
    mission: "FalconSat",
  });

  if (firstLaunch) {
    console.log("Data already loaded from SpaceX");
    return;
  } else {
    populateLaunches();
  }
}

async function getLatestFlightNumber() {
  const latestLaunch = await launches.findOne().sort("-flightNumber");

  if (!latestLaunch) return 100;

  return latestLaunch.flightNumber;
}

async function getAllLaunches(skip, limit) {
  return await launches.find({}, { _id: 0, __v: 0 }).skip(skip).limit(limit);
}

async function saveLaunch(launch) {
  return await launches.findOneAndUpdate(
    { flightNumber: launch.flightNumber },
    launch,
    { upsert: true }
  );
}

async function scheduleNewLaunch(launch) {
  const planet = await planets.findOne({ keplerName: launch.destination });

  if (!planet) throw new Error("Planet not found");

  const latestLaunchNumber = (await getLatestFlightNumber(launch)) + 1;

  const newLaunch = Object.assign(launch, {
    upcoming: true,
    success: true,
    flightNumber: latestLaunchNumber,
    customers: ["NASA", "YodaOne"],
  });

  await saveLaunch(newLaunch);
}

async function abortLaunch(launchId) {
  const aborted = await launches.updateOne(
    { flightNumber: launchId },
    { upcoming: false, success: false }
  );
  console.log(aborted);
  return aborted.modifiedCount === 1;
}

module.exports = {
  existsLaunchWithId,
  getAllLaunches,
  abortLaunch,
  scheduleNewLaunch,
  loadLaunchesData,
};
