const ValidarCampos = require("./validar_campos");
const ValidarRol = require("./validar_rol");

module.exports = {
  ...ValidarCampos,
  ...ValidarRol,
};
