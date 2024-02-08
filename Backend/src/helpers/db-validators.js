const Estudiante = require("../models/estudiante");

const ifExisteDID = async (documento_id) => {
  const existeID = await Estudiante.findOne({documento_id})
  if (existeID) {
    throw new Error(`El docuemto: ${documento_id} ya se encuentra registrado`);
  }
};

const existeEstudianteById = async(id) => {
  const existeEstudiante = await Estudiante.findById(id)
  if(!existeEstudiante){
    throw new Error(`El id: ${id} no existe`)  }
}

module.exports = {
  ifExisteDID,
  existeEstudianteById
};
