const express = require("express");
const router = express.Router();
const roleMiddleware = require("../Middlewares/RoleMiddleware");
const authMiddleware = require("../Middlewares/AuthMiddleware.js");
const { login, register } = require("../Controllers/Auth");
const {
  changeRole,
  getAll,
  changeStatus,
} = require("../Controllers/UserController.js");

router.route("/login").post(login);
router.route("/register").post(register);

router
  .route("/changeRole/:id")
  .patch(authMiddleware, roleMiddleware("ADMIN"), changeRole);
  
router.route("/users").get(authMiddleware, roleMiddleware("ADMIN"), getAll);

router
  .route("/users/changeStatus/:id")
  .patch(authMiddleware, roleMiddleware("ADMIN"), changeStatus);

module.exports = router;
