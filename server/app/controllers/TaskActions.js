const jwt = require("jsonwebtoken");

const tables = require("../../database/table");

const browse = async (req, res, next) => {
  try {
    const auth = req.cookies.auth;
    const decodeToken = await jwt.decode(auth);
    const userID = decodeToken.id;
    const task = await tables.task.readAll(userID);

    res.json(task);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const task = await tables.task.read(req.params.id);
    if (task == null) {
      res.sendStatus(404);
    } else {
      res.json(task);
    }
  } catch (error) {
    next(error);
  }
};

const edit = async (req, res, next) => {
  try {
    const task = { ...req.body, id: Number(req.params.id) };
    await tables.task.update(task);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const task = req.body;

  try {
    const insertId = await tables.task.create(task);
    res.status(201).json({ insertId });
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    await tables.task.delete(req.params.id);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const taskActions = { browse, read, edit, add, destroy };
module.exports = taskActions;
