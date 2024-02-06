const { Router } = require("express");
const { check } = require("express-validator");
const {
  estudianteGet,
  estudiantePost,
  estudiantePut,
  estudianteDelete,
} = require("../controller/estudiante");
const { ValidarCampos } = require("../middlewares");

const router = Router();

router.get("/", estudianteGet);

router.post(
  "/",
  [check("nombre", "El nombre es obligatorio").not().isEmpty(),
  check("apellido", "El apellido es obligatorio").not().isEmpty(),
  check("edad", "La edad es obligatoria").not().isEmpty(),
  check("documento_id", "El documento de identidad obligatorio").not().isEmpty(),
  ValidarCampos
],
  estudiantePost
);

router.put("/", estudiantePut);

router.delete("/", estudianteDelete);

module.exports = router;
