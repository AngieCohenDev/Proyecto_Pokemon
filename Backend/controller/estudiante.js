const { request, response } = require("express");
const bcryptjs = require("bcryptjs");

const Estudiante = require("../models/estudiante");

const estudianteGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, estudiantes] = await Promise.all([
    Estudiante.countDocuments(query),
    Estudiante.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({
    total,
    estudiantes,
  });
};

const estudiantePost = async (req = request, res = response) => {
  const { nombre, apellido, edad, documento_id } = req.body;
  const estudiante = new Estudiante({ nombre, apellido, edad, documento_id });

  //Guardar en base de datos
  await estudiante.save();

  res.json({
    estudiante
  })
};

const estudiantePut = async (req = request, res = response) => {
  res.json({
    msg: "Put estudiante si funciona",
  });
};

const estudianteDelete = async (req = request, res = response) => {
  res.json({
    msg: "Delete estudiante si funciona",
  });
};

module.exports = {
  estudianteGet,
  estudiantePost,
  estudiantePut,
  estudianteDelete,
};
