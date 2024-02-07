const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);

    console.log("Base de datos online, todo ok");
 
} catch (error) {
    console.log(error);
    throw new Error("Error al momento de inicializar la base de datos");
  }
};

module.exports = {
  dbConnection,
};
