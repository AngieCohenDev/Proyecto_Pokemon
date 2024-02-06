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
    check("edad", "La edad es obligatoria").not().isEmpty(),
    check("documento_id", "El documento de identidad obligatorio").not().isEmpty(),
    check("rol", "El rol es requerido").not().isEmpty(),
    ValidarCampos

  ],
  docentePost
);

router.put("/", docentePut);
router.delete("/", docenteDelete);

module.exports = router;
