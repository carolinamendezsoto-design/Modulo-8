// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

// Importamos Sequelize (ORM para trabajar con la base de datos)
const { Sequelize } = require("sequelize");

// Importamos dotenv para leer variables de entorno desde .env
require("dotenv").config();


// ------------------------------------------------------
// CREAR CONEXIÓN A LA BASE DE DATOS
// ------------------------------------------------------

// Creamos una instancia de Sequelize que representa la conexión
const sequelize = new Sequelize(

  // Nombre de la base de datos (desde .env)
  process.env.DB_NAME,

  // Usuario de la base de datos (desde .env)
  process.env.DB_USER,

  // Contraseña del usuario (desde .env)
  process.env.DB_PASSWORD,

  {

    // Host donde está la base de datos (ej: localhost)
    host: process.env.DB_HOST,

    // Tipo de base de datos → PostgreSQL
    dialect: "postgres",

    // Puerto de conexión (por defecto PostgreSQL usa 5432)
    port: process.env.DB_PORT,

    // Evita que Sequelize imprima todas las consultas en consola
    logging: false,

    // Opciones específicas de PostgreSQL
    dialectOptions: {
      connectTimeout: 60000 // tiempo máximo de conexión (60 segundos)
    }

  }

);


// ------------------------------------------------------
// FUNCIÓN PARA PROBAR LA CONEXIÓN
// ------------------------------------------------------

// Esta función intenta conectarse a la base de datos
// y sirve para verificar que todo esté funcionando correctamente
const connectDB = async () => {

  try {

    // Intentamos autenticarnos en la base de datos
    await sequelize.authenticate();

    // Si todo sale bien, mostramos mensaje en consola
    console.log("✅ Conectado correctamente a PostgreSQL");

  } catch (error) {

    // Si ocurre un error, lo mostramos en consola
    console.error("❌ Error al conectar con la base de datos:", error.message);

  }

};


// ------------------------------------------------------
// EXPORTAR CONEXIÓN
// ------------------------------------------------------

// Exportamos:
// sequelize → para usarlo en modelos y consultas
// connectDB → para ejecutarlo desde index.js o app.js
module.exports = { sequelize, connectDB };