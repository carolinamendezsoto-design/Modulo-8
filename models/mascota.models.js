// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

// Importamos tipos de datos de Sequelize
const { DataTypes } = require("sequelize");

// Importamos la conexión a la base de datos
const { sequelize } = require("../config/database");


// ------------------------------------------------------
// DEFINICIÓN DEL MODELO MASCOTA
// ------------------------------------------------------

// Definimos el modelo Mascota (tabla en la BD)
const Mascota = sequelize.define("Mascota", {

    // --------------------------------------------------
    // ID
    // --------------------------------------------------

    // Identificador único de la mascota
    id: {
        type: DataTypes.INTEGER,   // tipo número entero
        primaryKey: true,          // clave primaria
        autoIncrement: true        // autoincremental
    },

    // --------------------------------------------------
    // NOMBRE
    // --------------------------------------------------

    // Nombre de la mascota
    nombre: {
        type: DataTypes.STRING,    // texto corto
        allowNull: false,          // obligatorio
        validate: {
            notEmpty: true         // no permite vacío
        }
    },

    // --------------------------------------------------
    // EDAD
    // --------------------------------------------------

    // Edad de la mascota
    edad: {
        type: DataTypes.INTEGER,   // número entero
        allowNull: false,          // obligatorio
        validate: {
            isInt: true,           // debe ser entero
            min: 0                 // no negativos
        }
    },

    // --------------------------------------------------
    // PORTE
    // --------------------------------------------------

    // Tamaño de la mascota
    porte: {
        type: DataTypes.STRING,    // texto
        allowNull: false,          // obligatorio
        validate: {
            notEmpty: true         // no vacío
        }
    },

    // --------------------------------------------------
    // ENERGÍA
    // --------------------------------------------------

    // Nivel de energía
    energia: {
        type: DataTypes.STRING,    // texto
        allowNull: false,          // obligatorio
        validate: {
            notEmpty: true
        }
    },

    // --------------------------------------------------
    // DESCRIPCIÓN
    // --------------------------------------------------

    // Descripción detallada de la mascota
    descripcion: {
        type: DataTypes.TEXT,      // texto largo
        allowNull: false,          // obligatorio
        validate: {
            len: [10, 1000]        // mínimo 10 caracteres
        }
    },

    // --------------------------------------------------
    // IMAGEN
    // --------------------------------------------------

    // Nombre del archivo de imagen (subido con multer)
    imagen: {
        type: DataTypes.STRING,    // texto
        allowNull: true            // opcional
    },

    // --------------------------------------------------
    // ESTADO
    // --------------------------------------------------

    // Estado de adopción
    estado: {
        type: DataTypes.ENUM("disponible", "adoptado"), // valores permitidos
        defaultValue: "disponible" // valor inicial
    },

    // --------------------------------------------------
    // USER ID (FK)
    // --------------------------------------------------

    // ID del usuario que publica la mascota
    userId: {
        type: DataTypes.INTEGER,   // número
        allowNull: false,          // obligatorio
        validate: {
            isInt: true            // validación
        }
    }

}, {

    tableName: "mascotas", // nombre real en BD (buena práctica)
    timestamps: true       // agrega createdAt y updatedAt

});


// ------------------------------------------------------
// EXPORTAR MODELO
// ------------------------------------------------------

// Exportamos modelo para usar en services/controllers
module.exports = Mascota;