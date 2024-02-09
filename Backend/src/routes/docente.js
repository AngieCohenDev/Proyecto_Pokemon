const { Router } = require("express");
const { check } = require("express-validator");

const {
  docenteGet,
  docentePost,
  docentePut,
  docenteDelete,
} = require("../controller/docente");
const { ValidarCampos } = require("../middlewares");

const router = Router();

router.get("/", docenteGet);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("apellido", "El apellido es obligatorio").not().isEmpty(),
    check(
      "password",
      "La contraseña debe de ser de mas de 6 caractares"
    ).isLength({ min: 6 }),
    check("edad", "La edad es obligatoria")
      .not()
      .isEmpty()
      .isInt({ min: 15, max: 99 })
      .withMessage("Edad no permitida"),
    check("documento_id", "El documento de identidad obligatorio")
      .not()
      .isEmpty()
      .isLength({ min: 10, max: 10 })
      .withMessage("El documento debe de tener 10 numeros"),
    check("rol", "El rol es requerido").not().isEmpty(),
    ValidarCampos,
  ],
  docentePost
);

router.put("/", docentePut);
router.delete("/", docenteDelete);

module.exports = router;
