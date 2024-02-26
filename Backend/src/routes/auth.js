const { Router } = require("express");
const { check } = require("express-validator");
const { ValidarCampos } = require("../middlewares");
const { loginDocente, loginEstudiante } = require("../controller/auth");

const router = Router();

router.post("/login", [
  check("documento_id", "El documento de identidad obligatorio")
    .not()
    .isEmpty()
    .isLength({ min: 10, max: 10 })
    .withMessage("El documento debe de tener 10 numeros"),
  check("password", "La contraseña debe de ser de mas de 6 caractares")
    .not()
    .isEmpty()
    .isLength({ min: 6 }),
  ValidarCampos,
], loginDocente);
router.post("/loginEstudiante", [
  check("documento_id", "El documento de identidad obligatorio")
    .not()
    .isEmpty()
    .isLength({ min: 10, max: 10 })
    .withMessage("El documento debe de tener 10 numeros"),
  check("password", "La contraseña debe de ser de mas de 6 caractares")
    .not()
    .isEmpty()
    .isLength({ min: 6 }),

  ValidarCampos,
], loginEstudiante);

module.exports = router;
