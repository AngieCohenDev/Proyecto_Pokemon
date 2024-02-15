const dbValidators = require("./db-validators");
const generarJWT = require('./generar-jwt')


//TODO: investigar que son los tres puntos
module.exports = {
  ...dbValidators,
  ...generarJWT
};
