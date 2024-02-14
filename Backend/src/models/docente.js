const { Schema, model } = require("mongoose");

const DocenteSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es requerido"],
  },
  apellido: {
    type: String,
    required: [true, "El apellido es requerido"],
  },
  documento_id: {
    type: Number,
    required: [true, "El documento de identidad es requerido"],
  },
  password: {
    type: String,
    require: [true, "La contraseña es requerida"],
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

DocenteSchema.methods.toJSON = function () {
  const { __v, _id, ...docente } = this.toObject();
  docente.iud = _id;
  return docente;
};

module.exports = model("Docente", DocenteSchema);
