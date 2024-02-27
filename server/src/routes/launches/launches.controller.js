const { getAllLaunches, addNewLaunch } = require("../../models/launches.model");

const httpGetAllLaunches = (req, res) => {
  return res.status(200).json(getAllLaunches());
};
const httpAddNewLaunch = (req, res) => {
  const launch = req.body;
  const { mission, rocket, launchDate, destination } = launch;

  if (!mission || !rocket || !launchDate || !destination) {
    return res.status(400).json({
      error: "Missing required launch property",
    });
  }

  addNewLaunch(launch);

  launch.launchDate = new Date(launchDate);

  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "Invalid launch date",
    });
  }

  return res.status(201).json(launch);
};

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
};
