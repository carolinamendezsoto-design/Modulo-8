// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

// Importamos Sequelize (ORM para trabajar con la base de datos)
const { Sequelize } = require("sequelize");

// Importamos dotenv para leer variables de entorno desde .env
require("dotenv").config();


// ------------------------------------------------------
// VALIDACIÓN DE VARIABLES DE ENTORNO (🔥 PRO)
// ------------------------------------------------------

// Verificamos que todas las variables necesarias existan
const requiredEnv = ["DB_NAME", "DB_USER", "DB_PASSWORD", "DB_HOST", "DB_PORT"];

requiredEnv.forEach((env) => {
  if (!process.env[env]) {
    console.warn(`⚠️ Falta variable de entorno: ${env}`);
  }
});


// ------------------------------------------------------
// CREAR CONEXIÓN A LA BASE DE DATOS
// ------------------------------------------------------

// Creamos instancia de Sequelize (conexión)
const sequelize = new Sequelize(

  process.env.DB_NAME,     // nombre base de datos
  process.env.DB_USER,     // usuario
  process.env.DB_PASSWORD, // contraseña

  {
    host: process.env.DB_HOST, // host (localhost normalmente)

    dialect: "postgres", // tipo de BD

    port: process.env.DB_PORT || 5432, // puerto (fallback si falta)

    logging: false, // no mostrar queries en consola

    dialectOptions: {
      connectTimeout: 60000 // timeout conexión (60 seg)
    }
  }

);


// ------------------------------------------------------
// FUNCIÓN PARA PROBAR CONEXIÓN
// ------------------------------------------------------

const connectDB = async () => {

  try {

    // Intentamos autenticarnos
    await sequelize.authenticate();

    console.log("✅ Conectado correctamente a PostgreSQL");

  } catch (error) {

    // Mostramos error detallado
    console.error("❌ Error al conectar con la base de datos:");
    console.error(error.message);

  }

};


// ------------------------------------------------------
// EXPORTAR CONEXIÓN
// ------------------------------------------------------

module.exports = {
  sequelize, // conexión principal
  connectDB  // función de prueba
};