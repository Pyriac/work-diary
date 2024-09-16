const { v4: uuidv4 } = require("uuid");
const Joi = require("joi");

const randomID = (req, res, next) => {
  req.body.id = uuidv4();
  next();
};

const verifyRegister = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).messages({
      "string.empty": "Vous devez obligatoirement saisir votre email",
      "string.email": "Merci de saisir un email valide",
    }),
    name: Joi.string().messages({
      "string.empty": "Vous devez obligatoirement saisir votre prénom",
    }),
    password: Joi.string()
      .pattern(new RegExp(/^(?=.*[A-Z])(?=.*[\W_]).{8,}$/))
      .messages({
        "string.empty": "Vous devez obligatoirement saisir un mot de passe",
        "string.pattern.base": "Le mot de passe ne remplit pas les conditions",
      }),
    confirmPassword: Joi.string().valid(Joi.ref("password")).messages({
      "any.only": "Les mots de passe doivent être identiques",
    }),
  });

  const result = schema.validate(req.body);

  if (result.error) {
    res.status(400).send(result.error.message);
  } else {
    next();
  }
};

const middleware = { randomID, verifyRegister };

module.exports = middleware;
