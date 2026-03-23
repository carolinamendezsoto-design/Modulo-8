// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

// Importamos Sequelize (ORM para trabajar con la base de datos relacional)
const { Sequelize } = require("sequelize");

// Importamos dotenv para poder usar variables de entorno desde el archivo .env
require("dotenv").config();


// ------------------------------------------------------
// VALIDACIÓN DE VARIABLES DE ENTORNO (🔥 NIVEL PRO)
// ------------------------------------------------------

// Definimos las variables necesarias para que la app funcione correctamente
const requiredEnv = ["DB_NAME", "DB_USER", "DB_PASSWORD", "DB_HOST", "DB_PORT"];

// Recorremos cada variable requerida
requiredEnv.forEach((env) => {

  // Si la variable no existe en el entorno (.env)
  if (!process.env[env]) {

    // Mostramos advertencia en consola
    console.warn(`⚠️ Falta variable de entorno: ${env}`);

    // 💡 Mejora PRO: podrías incluso detener la app aquí con process.exit(1)
  }

});


// ------------------------------------------------------
// CREAR CONEXIÓN A LA BASE DE DATOS
// ------------------------------------------------------

// Creamos una instancia de Sequelize que representa la conexión a la BD
const sequelize = new Sequelize(

  process.env.DB_NAME,     // Nombre de la base de datos
  process.env.DB_USER,     // Usuario de la base de datos
  process.env.DB_PASSWORD, // Contraseña del usuario

  {
    host: process.env.DB_HOST, // Dirección del servidor (ej: localhost)

    dialect: "postgres", // Tipo de base de datos (PostgreSQL)

    port: process.env.DB_PORT || 5432, // Puerto (usa 5432 si no se define)

    logging: false, // Desactiva logs de queries SQL (más limpio en consola)

    dialectOptions: {
      connectTimeout: 60000 // Tiempo máximo de espera para conexión (60 seg)
    },

    pool: {
      max: 5,   // Máximo de conexiones simultáneas
      min: 0,   // Mínimo de conexiones
      acquire: 30000, // Tiempo máximo para intentar obtener conexión
      idle: 10000     // Tiempo antes de liberar conexión inactiva
    }

  }

);


// ------------------------------------------------------
// FUNCIÓN PARA PROBAR CONEXIÓN
// ------------------------------------------------------

// Función async para verificar conexión con la base de datos
const connectDB = async () => {

  try {

    // Intentamos autenticarnos con la base de datos
    await sequelize.authenticate();

    // Si funciona, mostramos mensaje de éxito
    console.log("✅ Conectado correctamente a PostgreSQL");

  } catch (error) {

    // Si falla, mostramos error detallado
    console.error("❌ Error al conectar con la base de datos:");

    console.error(error.message);

    // 💡 Mejora PRO: opcionalmente puedes cerrar la app si falla conexión
    // process.exit(1);

  }

};


// ------------------------------------------------------
// EXPORTAR CONEXIÓN
// ------------------------------------------------------

// Exportamos tanto la instancia Sequelize como la función de conexión
module.exports = {
  sequelize, // instancia principal de conexión
  connectDB  // función para validar conexión
};