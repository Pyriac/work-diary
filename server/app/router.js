const express = require("express");

const router = express.Router();

// Import Controllers here
/* ************************************************************************* */
const taskActions = require("./controllers/TaskActions");
const userActions = require("./controllers/UserActions");
const authActions = require("./controllers/AuthActions");
const auth = require("./services/auth");
const middleware = require("./services/middleware");
/* ************************************************************************* */

router.get("/task", taskActions.browse);
router.get("/task/:id", taskActions.read);
router.put("/task/:id", taskActions.edit);
router.post(
  "/task",
  auth.verifyToken,
  middleware.verifyAddTask,
  middleware.randomID,
  taskActions.add
);
router.delete("/task/:id", taskActions.destroy);

router.get("/users", userActions.browse);
router.get("/users/:id", userActions.read);
router.post(
  "/users",
  middleware.verifyRegister,
  middleware.randomID,
  auth.hashPassword,
  userActions.add
);
router.get("/user/profile", userActions.browse);

router.post(
  "/login",
  authActions.verifyPassword,
  auth.createToken,
  userActions.login
);

router.get("/auth-cookie", auth.cookieUser);

module.exports = router;
