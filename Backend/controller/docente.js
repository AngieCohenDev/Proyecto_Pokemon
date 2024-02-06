const { request, response } = require("express");

const Docente = require("../models/docente");

const docenteGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, docentes] = await Promise.all([
    Docente.countDocuments(query),
    Docente.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({
    total,
    docentes,
  });
};

const docentePost = async (req = request, res = response) => {
  const { nombre, apellido, documento_id, rol } = req.body;
  const docente = new Docente({ nombre, apellido, documento_id, rol });

  // Guardar en base de Datos
  await docente.save();

  res.json({
    docente,
  });
};

const docentePut = (req = request, res = response) => {
  res.json({
    msg: "put API - controlador",
  });
};

const docenteDelete = (req = request, res = response) => {
  res.json({
    msg: "delete API - controlador",
  });
};

module.exports = {
  docenteGet,
  docentePost,
  docentePut,
  docenteDelete,
};
