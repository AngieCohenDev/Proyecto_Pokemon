const { response } = require("express");
const { ObjectId } = require("mongoose").Types;
const { Estudiante, Docente, Curso } = require("../models");

const coleccionesPermitidas = ["cursos", "docentes", "estudiantes"];

const buscarEstudiante = async (termino = "", res = response) => {
  const esMongoID = ObjectId.isValid(termino);

  if (esMongoID) {
    const estudiante = await Estudiante.findById(termino);
    return res.json({
      results: estudiante ? [estudiante] : [],
    });
  }

  const regex = new RegExp(termino, "i");

  const estudiantes = await Estudiante.find({
    $or: [{ nombre: regex }, { apellido: regex }],
    $and: [{ estado: true }],
  });

  return res.json({
    results: estudiantes,
  });
};

const buscarDocente = async (termino = "", res = response) => {
  const esMongoID = ObjectId.isValid(termino);

  if (esMongoID) {
    const docente = await Docente.findById(termino);
    return res.json({
      results: docente ? [docente] : [],
    });
  }

  const regex = new RegExp(termino, "i");

  const docentes = await Docente.find({
    $or: [{ nombre: regex }, { apellido: regex }],
    $and: [{ estado: true }],
  });

  return res.json({
    results: docentes,
  });
};

const buscarCursos = async (termino = "", res = response) => {
  const esMongoID = ObjectId.isValid(termino);

  if (esMongoID) {
    const curso = await Curso.findById(termino);
    return res.json({
      results: curso ? [curso] : [],
    });
  }

  const regex = new RegExp(termino, "i");

  const cursos = await Curso.find({
    nombre: regex,
    estado: true,
  }).populate("docente", "nombre");

  return res.json({
    results: cursos,
  });
};

const buscar = (req, res = response) => {
  const { coleccion, termino } = req.params;

  if (!coleccionesPermitidas.includes(coleccion)) {
    return res.status(400).json({
      msg: ` Las colecciones permitidas son: ${coleccionesPermitidas}`,
    });
  }

  switch (coleccion) {
    case "estudiantes":
      buscarEstudiante(termino, res);
      break;

    case "docentes":
      buscarDocente(termino, res);
      break;

    case "cursos":
      buscarCursos(termino, res);
      break;

    default:
      res.status(500).json({
        msg: "Esta busqueda no existe",
      });
  }
};

module.exports = {
  buscar,
  buscarEstudiante,
  buscarDocente,
};
