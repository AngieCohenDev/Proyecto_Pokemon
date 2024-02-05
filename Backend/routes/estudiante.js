const { Router } = require("express");
const {
  estudianteGet,
  estudiantePost,
  estudiantePut,
  estudianteDelete,
} = require("../controller/estudiante");

const router = Router();

router.get("/", estudianteGet);

router.post("/", estudiantePost);

router.put("/", estudiantePut);

router.delete("/", estudianteDelete);

module.exports = router;
