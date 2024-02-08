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
  const { nombre, apellido, password, edad, documento_id, rol, cursos } =
    req.body;
  const estudiante = new Estudiante({
    nombre,
    apellido,
    password,
    edad,
    documento_id,
    rol,
    cursos,
  });

  // Encriptar passwordo
  // Generar la sal (salt)
  const salt = bcryptjs.genSaltSync(10); // 10 es el número de iteraciones

  // Encriptar la contraseña usando la sal
  estudiante.password = bcryptjs.hashSync(password, salt);

  //Guardar en base de datos
  await estudiante.save();

  res.json({
    estudiante,
  });
};

const estudiantePut = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, password, ...resto } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const estudiante = await Estudiante.findByIdAndUpdate(id, resto, {
    new: true,
  });

  res.json({
    estudiante,
  });
};

const estudianteDelete = async (req = request, res = response) => {
  const { id } = req.params;

  const estudiante = await Estudiante.findByIdAndUpdate(id, { estado: false });

  res.json({
    estudiante,
  });
};

module.exports = {
  estudianteGet,
  estudiantePost,
  estudiantePut,
  estudianteDelete,
};
