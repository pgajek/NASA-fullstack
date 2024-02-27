const express = require("express");
const {
  httpGetAllLaunches,
  httpAddNewLaunch,
} = require("./launches.controller");
const { httpGetAllPlanets } = require("../planets/planets.controller");

const launchesRouter = express.Router();

launchesRouter.get("/", httpGetAllLaunches);
launchesRouter.post("/", httpAddNewLaunch);

module.exports = launchesRouter;
