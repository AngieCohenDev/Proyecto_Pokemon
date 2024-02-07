const { Schema, model } = require("mongoose");
const Docente = require("./docente");

const CursoSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre del curso es obligatorio"],
    unique: true,
  },
  duracion: {
    type: Number,
    required: [true, "La duracion del curso es requerida"],
  },
  docente: {
    type: Schema.Types.ObjectId,
    ref: "Docente",
    required: [true, "El docente es requerido"],
  },
  estado: {
    type: Boolean,
    default: true,
  },
  cursos: [],
});

module.exports = model("Curso", CursoSchema);
