const express = require("express");

const router = express.Router();

// Import Controllers here
/* ************************************************************************* */
const taskActions = require("./controllers/TaskActions");
const userActions = require("./controllers/UserActions");
const authActions = require("./controllers/AuthActions");
const { hashPassword } = require("./services/auth");
const middleware = require("./services/middleware");
/* ************************************************************************* */

router.get("/task", taskActions.browse);
router.get("/task/:id", taskActions.read);
router.put("/task/:id", taskActions.edit);
router.post("/task", taskActions.add);
router.delete("/task/:id", taskActions.destroy);

router.get("/users", userActions.browse);
router.get("/users/:id", userActions.read);
router.post("/users", middleware.randomID, hashPassword, userActions.add);

router.post("/login", authActions.login);

module.exports = router;
