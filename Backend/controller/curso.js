const { response } = require("express");

const Curso = require("../models/curso");

const cursoGet = async (req = response, res = response) => {
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

const cursoPost = async (req = response, res = response) => {
  const { nombre, duracion } = req.body;
  const curso = new Curso({ nombre, duracion });

  //Guardar en base de datos
  await curso.save();

  res.json({
    curso,
  });
};

const cursoPut = (req = response, res = response) => {
  res.json({
    msg: "Put de cursos funciona",
  });
};

const cursoDelete = (req = response, res = response) => {
  res.json({
    msg: "Delete de cursos funciona",
  });
};

module.exports = {
  cursoGet,
  cursoPost,
  cursoPut,
  cursoDelete,
};
