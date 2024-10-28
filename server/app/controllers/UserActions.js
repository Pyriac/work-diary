const tables = require("../../database/table");

const browse = async (req, res, next) => {
  try {
    const users = await tables.user.readAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

const readByCookie = async (req, res, next) => {
  try {
    const user = await tables.user.read(req.body.id);
    user ? res.json(user) : res.sendStatus(404);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const user = await tables.user.read(req.params.id);
    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const user = req.body;
  try {
    const insertId = await tables.user.create(user);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    res.cookie("auth", req.token).json({
      message: "Connexion réussie",
      id: req.user.id,
      email: req.user.email,
      name: req.user.name,
    });
  } catch (error) {
    next(error);
  }
};

const userActions = { browse, read, add, login, readByCookie };

module.exports = userActions;
