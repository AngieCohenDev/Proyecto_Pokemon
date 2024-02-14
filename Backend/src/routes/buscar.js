const { Router } = require("express");
const {buscar, prueba} = require("../controller/buscar");

const router = Router();

//router.get("/coleccion/:termino", buscar);
router.get("/:coleccion/:termino", buscar);


module.exports = router;
