const argon2 = require("argon2");
// Import access to database tables
const tables = require("../../database/table");

const verifyPassword = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await tables.user.readByEmail(email);

    if (!user) {
      res.sendStatus(401);
    }

    req.user = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    const verified = await argon2.verify(user.password, password);

    if (!verified) {
      res.sendStatus(401);
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const AuthActions = { verifyPassword };

module.exports = AuthActions;
