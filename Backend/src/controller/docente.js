const { request, response } = require("express");
const bcryptjs = require("bcryptjs");

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
  const { nombre, apellido, documento_id, password, curso, rol } = req.body;
  const docente = new Docente({
    nombre,
    apellido,
    documento_id,
    password,
    curso,
    rol,
  });

  // Encriptar passwordo
  // Generar la sal (salt)
  const salt = bcryptjs.genSaltSync(10); // 10 es el número de iteraciones

  // Encriptar la contraseña usando la sal
  docente.password = bcryptjs.hashSync(password, salt);

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

const docenteDelete = async (req = request, res = response) => {
  const { id } = req.params;

  docente = await Docente.findByIdAndUpdate(id, { estado: false });

  res.json({
    docente,
  });
};

module.exports = {
  docenteGet,
  docentePost,
  docentePut,
  docenteDelete,
};
