const { v4: uuidv4 } = require("uuid");

const randomID = (req, res, next) => {
  req.body.id = uuidv4();
  next();
};

const middleware = { randomID };

module.exports = middleware;
