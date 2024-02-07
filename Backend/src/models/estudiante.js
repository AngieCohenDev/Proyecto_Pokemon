const { Schema, model } = require("mongoose");

const EstudianteSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es requerido"],
  },
  apellido: {
    type: String,
    required: [true, "El apellido es requerido"],
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
  },
  edad: {
    type: Number,
    required: [true, "La edad es requerida"],
  },
  documento_id: {
    type: Number,
    required: [true, "El documento de identidad es requerido"],
    unique: true,
  },
  cursos: [
    {
      type: Schema.Types.ObjectId,
      ref: "Curso",
    },
  ],
  rol: {
    type: String,
    required: true,
    enum: ["DOCENTE", "ESTUDIANTE"],
  },
  estado: {
    type: Boolean,
    default: true,
  },
});

module.exports = model("Estudiante", EstudianteSchema);
