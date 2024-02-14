const Estudiante = require("../models/estudiante");
const Curso  = require('../models/curso')
const Docente = require('../models/docente')

const ifExisteDID = async (documento_id) => {
  const existeID = await Estudiante.findOne({documento_id})
  if (existeID) {
    throw new Error(`El documento: ${documento_id} ya se encuentra registrado`);
  }
};

const existeEstudianteById = async(id) => {
  const existeEstudiante = await Estudiante.findById(id)
  if(!existeEstudiante){
    throw new Error(`El id: ${id} no existe`)  }
}

const existeCursoById = async(id) => {
  const existeCurso = await Curso.findById(id)
  if(!existeCurso){
    throw new Error(`El id: ${id} no esta asociado a ningun curso`)
  }
}

const existeDocenteById = async(id) => {
  const existeDocente = await Docente.findById(id)
  if(!existeDocente){
    throw new Error(`El id: ${id} no esta asociado a ningun docente`)
  }
}

module.exports = {
  ifExisteDID,
  existeEstudianteById,
  existeCursoById,
  existeDocenteById
};
