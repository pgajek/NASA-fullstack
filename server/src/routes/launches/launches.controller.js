const {
  getAllLaunches,
  scheduleNewLaunch,
  abortLaunch,
  existsLaunchWithId,
} = require("../../models/launches.model");

const httpGetAllLaunches = async (req, res) => {
  const launches = await getAllLaunches();
  return res.status(200).json(launches);
};

const httpScheduleNewLaunch = async (req, res) => {
  const launch = req.body;
  const { mission, rocket, launchDate, destination } = launch;

  if (!mission || !rocket || !launchDate || !destination) {
    return res.status(400).json({
      error: "Missing required launch property",
    });
  }

  launch.launchDate = new Date(launchDate);

  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "Invalid launch date",
    });
  }

  await scheduleNewLaunch(launch);

  return res.status(201).json(launch);
};
async function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id);

  if (!existsLaunchWithId(launchId)) {
    return res.status(404).json({ message: "Launch not found" });
  }
  const aborted = abortLaunch(launchId);

  return res.status(200).json(aborted);
}

module.exports = {
  httpGetAllLaunches,
  httpScheduleNewLaunch,
  httpAbortLaunch,
};
