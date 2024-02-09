const { Router } = require("express");
const { check } = require("express-validator");
const {
  cursoGet,
  cursoPost,
  cursoPut,
  cursoDelete,
} = require("../controller/curso");
const { ValidarCampos, adminRol, } = require("../middlewares");
const { existeCursoById } = require("../helpers/db-validators");

const router = Router();

router.get("/", cursoGet);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("duracion", "La duracion es obligatoria").not().isEmpty(),
    check("docente", "El docente es requerido").not().isEmpty(),
    ValidarCampos
  ],
  cursoPost
);

router.put("/:id",[
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom(existeCursoById),
  check('rol').custom(adminRol),
  ValidarCampos
], cursoPut);
router.delete("/", cursoDelete);

module.exports = router;
