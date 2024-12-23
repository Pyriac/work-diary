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
  console.info(req.params.id)
  try {
    const task = { ...req.body, id: req.params.id };
    await tables.task.update(task);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

const add = async (req, res) => {
  const task = req.body;
  const auth = req.cookies.auth;
  try {
    const decodeToken = await jwt.decode(auth, process.env.APP_SECRET);
    const userID = decodeToken.id;
    const insertId = await tables.task.create(task, userID);
    res.status(201).json({ insertId});
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(403).json({
        message:
          "Jeton invalide ou APP_SECRET incorrect, veuillez vous reconnecter",
      });
    } else if (error instanceof jwt.TokenExpiredError) {
      return res.status(403).json({
        message:
          "Vous êtes connectés depuis trop longtemps, veuillez vous reconnecter",
      });
    } else if (error instanceof jwt.NotBeforeError) {
      return res
        .status(403)
        .json({ message: "Le jeton n'est pas encore valide" });
    }
    return res
      .status(500)
      .json({ message: "Erreur serveur", error: error.message });
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
