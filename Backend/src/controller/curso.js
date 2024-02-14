const { response, request } = require("express");

const Curso = require("../models/curso");

const cursosGet = async (req = response, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, curso] = await Promise.all([
    Curso.countDocuments(query),
    Curso.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({
    total,
    curso,
  });
};

const cursoGet = async (req = request, res = response) => {
  const {id} = req.params;
  const curso = await Curso.findById(id).populate('docente', ['nombre', 'apellido']);

  res.json(curso);
}

const cursoPost = async (req = response, res = response) => {
  const { nombre, duracion, docente } = req.body;
  const curso = new Curso({ nombre, duracion, docente });

  //Guardar en base de datos
  await curso.save();

  res.json({
    curso,
  });
};

const cursoPut = async(req = response, res = response) => {
  const {id} = req.params;
  const {_id, nombre, ...resto} = req.body;

  const curso = await Curso.findByIdAndUpdate(id, resto, {new: true});
  
  res.json({
    curso
  });
};

const cursoDelete = async(req = response, res = response) => {
  
  const {id} = req.params;

  curso = await Curso.findByIdAndUpdate(id, {estado: false})
  
  res.json({
    curso
  });
};

module.exports = {
  cursoGet,
  cursosGet,
  cursoPost,
  cursoPut,
  cursoDelete,
};
