const { Router } = require("express");
const { check } = require("express-validator");
const {
  estudianteGet,
  estudiantePost,
  estudiantePut,
  estudianteDelete,
} = require("../controller/estudiante");
const { ValidarCampos } = require("../middlewares");
const { ifExisteDID } = require("../helpers/db-validators");

const router = Router();

router.get("/", estudianteGet);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("apellido", "El apellido es obligatorio").not().isEmpty(),
    check(
      "password",
      "La contraseña tiene que tener mas de 6 caracteres"
    ).isLength({ min: 6 }),
    check("edad", "La edad es obligatoria").not().isEmpty(),
    check("documento_id", "El docuemento no es valido")
      .not()
      .isEmpty().custom(ifExisteDID),
    check("rol", "El rol es requerido").not().isEmpty(),
    ValidarCampos,
  ],
  estudiantePost
);

router.put("/", estudiantePut);

router.delete("/", estudianteDelete);

module.exports = router;
