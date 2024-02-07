const Estudiante = require("../models/estudiante");

const ifExisteDID = async (documento_id) => {
  const existeID = await Estudiante.findOne({documento_id})
  if (existeID) {
    throw new Error(`El docuemto: ${documento_id} ya se encuentra registrado`);
  }
};

module.exports = {
  ifExisteDID,
};
