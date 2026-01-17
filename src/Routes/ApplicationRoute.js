const express = require("express");
const roleMiddleware = require("../Middlewares/RoleMiddleware");

const router = express.Router();

const {
  createApp,
  updateApp,
  getAllApp,
  getApp,
} = require("../Controllers/ApplicationController");

router
  .route("/")
  .get(roleMiddleware("ADMIN", "EMPLOYER", "CANDIDATE"), getAllApp);

router
  .route("/:id")
  .post(roleMiddleware("CANDIDATE"), createApp)
  .get(roleMiddleware("CANDIDATE"), getApp)
  .patch(roleMiddleware("EMPLOYER"), updateApp);

module.exports = router;
