const express = require("express");
const router = express.Router();
const roleMiddleware = require("../Middlewares/RoleMiddleware");
const authMiddleware = require("../Middlewares/AuthMiddleware.js");
const { login, register, refreshTokenAuth } = require("../Controllers/Auth");
const {
  changeRole,
  getAll,
  changeStatus,
  changePasswordController,
  logout,
} = require("../Controllers/UserController.js");

router.route("/login").post(login);
router.route("/register").post(register);

router
  .route("/user/logout")
  .get(
    authMiddleware,
    roleMiddleware("ADMIN", "EMPLOYER", "CANDIDATE"),
    logout,
  );
router
  .route("/refresh")
  .post(
    authMiddleware,
    roleMiddleware("ADMIN", "EMPLOYER", "CANDIDATE"),
    refreshTokenAuth,
  );

router
  .route("/user/changePassword")
  .post(
    authMiddleware,
    roleMiddleware("ADMIN", "EMPLOYER", "CANDIDATE"),
    changePasswordController,
  );

router
  .route("/changeRole/:id")
  .patch(authMiddleware, roleMiddleware("ADMIN"), changeRole);

router.route("/users").get(authMiddleware, roleMiddleware("ADMIN"), getAll);

router
  .route("/users/changeStatus/:id")
  .patch(authMiddleware, roleMiddleware("ADMIN"), changeStatus);

module.exports = router;
