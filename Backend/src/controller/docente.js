const { request, response } = require("express");
const bcryptjs = require("bcryptjs");

const Docente = require("../models/docente");

const docentesGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  try {
    const [total, docentes] = await Promise.all([
      Docente.countDocuments(query),
      Docente.find(query).skip(Number(desde)).limit(Number(limite)),
    ]);

    res.json({
      total,
      docentes,
    });
  } catch (error) {
    res.status(404).json({
      msg: "No hay docentes en la base de datos",
    });
  }
};

const docenteGet = async (req = request, res = response) => {
  const { id } = req.params;
  const docente = await Docente.findById(id).populate("cursos", "nombre");

  res.json(docente);
};

const docentePost = async (req = request, res = response) => {
  const { nombre, apellido, documento_id, password, cursos, rol } = req.body;
  const docente = new Docente({
    nombre,
    apellido,
    documento_id,
    password,
    cursos,
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

const docentePut = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, documento_id, rol, password, ...resto } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const docente = await Docente.findByIdAndUpdate(id, resto, { new: true });

  res.json({
    docente,
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
  docentesGet,
  docentePost,
  docentePut,
  docenteDelete,
};
