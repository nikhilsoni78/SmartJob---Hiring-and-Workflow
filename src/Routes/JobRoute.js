const express = require("express");
const roleMiddleware = require("../Middlewares/RoleMiddleware");
const router = express.Router();

const {
  createJob,
  getJob,
  getAllJob,
  updateJob,
  deleteJob,
} = require("../Controllers/JobsController");

router
  .route("/")
  .get(roleMiddleware("ADMIN", "EMPLOYER"), getAllJob)
  .post(roleMiddleware("EMPLOYER"), createJob);
router
  .route("/:id")
  .get(roleMiddleware("ADMIN", "EMPLOYER"), getJob)
  .patch(roleMiddleware("EMPLOYER"), updateJob)
  .delete(roleMiddleware("EMPLOYER"), deleteJob);

module.exports = router;
