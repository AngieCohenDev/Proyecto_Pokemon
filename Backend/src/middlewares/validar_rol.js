const { response } = require("express");

const adminRol = (req = response, res = response, next) => {
  const { rol, nombre } = req.docente;

  if (rol !== "DOCENTE") {
    return res.status(401).json({
      msg: `${nombre} no es administrador`,
    });
  }
  next();
};

module.exports = {
  adminRol,
};
