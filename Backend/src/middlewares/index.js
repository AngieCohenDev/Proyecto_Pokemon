const ValidarCampos = require("./validar_campos");
const ValidarRol = require("./validar_rol");
const validarJWT = require("./validar-jwt");
module.exports = {
  ...ValidarCampos,
  ...ValidarRol,
  ...validarJWT
};
