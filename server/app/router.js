const express = require("express");

const router = express.Router();

// Import Controllers here
/* ************************************************************************* */
const taskActions = require("./controllers/TaskActions");
/* ************************************************************************* */

router.get("/task", taskActions.browse);

router.get("/task/:id", taskActions.read);

router.put("/task/:id", taskActions.edit);

router.post("/task", taskActions.add);

router.delete("/task/:id", taskActions.destroy);

module.exports = router;
