const { Router } = require("express");
const { check } = require("express-validator");
const {
  estudianteGet,
  estudiantePost,
  estudiantePut,
  estudianteDelete,
} = require("../controller/estudiante");

const router = Router();

router.get("/", estudianteGet);

router.post(
  "/",
  [check("nombre", "El nombre es obligatorio").isEmpty(),
  check("apellido", "El apellido es obligatorio").isEmpty(),
  check("edad", "La edad es obligatoria").isEmpty(),
  check("documento_id", "El documento de identidad obligatorio").isEmpty()
],
  estudiantePost
);

router.put("/", estudiantePut);

router.delete("/", estudianteDelete);

module.exports = router;
