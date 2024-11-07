const { v4: uuidv4 } = require("uuid");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

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

const verifyAddTask = (req, res, next) => {
  const schema = Joi.object({
    task: Joi.string().required().messages({
      "string.empty": "Merci de saisir un nom pour votre Tâche",
    }),
    client: Joi.string().required().messages({
      "string.empty": "Merci de saisir un nom pour votre Client",
    }),
    estimation: Joi.string().required().messages({
      "string.empty": "Merci de saisir une option pour votre devis",
    }),
    description: Joi.string().allow(null, ""),
    short_term: Joi.string().allow(null, ""),
    estimated_day: Joi.number().required().messages({
      "number.base":
        "Vous devez saisir une valeur numérique pour la durée estimée",
      "number.empty":
        "Pour le bon fonctionnement de l'agenda, merci de spécifier la durée estimée",
    }),
    deadline: Joi.date().required().messages({
     "date.base":"Merci de spécifier une date limite pour votre tache"
    }),
  });
  const result = schema.validate(req.body);

  if (result.error) {
    res.status(400).send(result.error.message);
  } else {
    next();
  }
};

const getCookieValue = async (req, res, next) => {
  const { auth } = req.cookies;
  const user = await jwt.verify(auth, process.env.APP_SECRET);
  req.body = user;
  user
    ? next()
    : res.sendStatus(500).json({ message: "Vous n'êtes pas connectés" });
};

const middleware = { randomID, verifyRegister, verifyAddTask, getCookieValue };

module.exports = middleware;
