const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 19 * 2 ** 10,
  timeCost: 2,
  parallelism: 1,
};

const hashPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const hashedPassword = await argon2.hash(password, hashingOptions);
    req.body.hashedPassword = hashedPassword;
    delete req.body.password;

    next();
  } catch (err) {
    next(err);
  }
};

const createToken = async (req, res, next) => {
  try {
    const payload = req.user;

    const token = await jwt.sign(payload, process.env.APP_SECRET, {
      expiresIn: "1y",
    });

    req.token = token;

    next();
  } catch (error) {
    next(error);
  }
};

const verifyToken = async (req, res, next) => {
  try {
    const { auth } = req.cookies;

    const result = await jwt.verify(auth, process.env.APP_SECRET);
    next();
  } catch (error) {
    next(error);
  }
};

const cookieUser = async (req, res, next) => {
  try {
    const { auth } = req.cookies;

    const response = await jwt.verify(auth, process.env.APP_SECRET);
    res.json(response);
  } catch (error) {
    res.status(401).json({ message: "Token invalide" });
  }
};

const auth = { hashPassword, createToken, verifyToken, cookieUser };

module.exports = auth;
