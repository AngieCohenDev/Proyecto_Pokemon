const { Router } = require("express");
const { check } = require("express-validator");
const {
  estudiantesGet,
  estudiantePost,
  estudiantePut,
  estudianteDelete,
  estudianteGet,
} = require("../controller/estudiante");
const { ValidarCampos, validarJWT } = require("../middlewares");
const {
  ifExisteDID,
  existeEstudianteById,
} = require("../helpers/db-validators");

const router = Router();

router.get("/", estudiantesGet);

router.get("/:id",[
  check('id', 'No es un id de Mongo valido').isMongoId(),
  check('id').custom(existeEstudianteById),
  ValidarCampos
], estudianteGet);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("apellido", "El apellido es obligatorio").not().isEmpty(),
    check(
      "password",
      "La contraseña tiene que tener mas de 6 caracteres"
    ).isLength({ min: 6 }),
    check("edad", "La edad es obligatoria")
      .not()
      .isEmpty()
      .isInt({ min: 15, max: 99 })
      .withMessage("Edad no permitida"),
    check("documento_id", "El documento es requerido")
      .not()
      .isEmpty()
      .custom(ifExisteDID)
      .isLength({ min: 10, max: 10 })
      .withMessage("El documento debe de tener 10 numeros"),
    check("rol", "El rol es requerido").not().isEmpty(),
    ValidarCampos,
  ],
  estudiantePost
);

router.put(
  "/:id",
  [
    validarJWT,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeEstudianteById),
    ValidarCampos,
  ],
  estudiantePut
);

router.delete(
  "/:id",
  [
    validarJWT,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeEstudianteById),
    ValidarCampos,
  ],
  estudianteDelete
);

module.exports = router;
