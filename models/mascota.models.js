// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

// Tipos de datos de Sequelize
const { DataTypes } = require("sequelize");

// Conexión a la base de datos
const { sequelize } = require("../config/database");


// ------------------------------------------------------
// DEFINICIÓN DEL MODELO
// ------------------------------------------------------

const Mascota = sequelize.define("Mascota", {

    // --------------------------------------------------
    // ID (CLAVE PRIMARIA)
    // --------------------------------------------------

    id: {
        type: DataTypes.INTEGER,          // número entero
        primaryKey: true,                 // clave primaria
        autoIncrement: true               // autoincremental
    },


    // --------------------------------------------------
    // NOMBRE
    // --------------------------------------------------

    nombre: {
        type: DataTypes.STRING,           // texto corto
        allowNull: false,                 // obligatorio
        validate: {
            notEmpty: {
                msg: "El nombre no puede estar vacío"
            }
        }
    },


    // --------------------------------------------------
    // EDAD
    // --------------------------------------------------

    edad: {
        type: DataTypes.INTEGER,          // entero
        allowNull: false,
        validate: {
            isInt: {
                msg: "La edad debe ser un número entero"
            },
            min: {
                args: [0],
                msg: "La edad no puede ser negativa"
            }
        }
    },


    // --------------------------------------------------
    // PORTE
    // --------------------------------------------------

    porte: {
        type: DataTypes.ENUM("pequeño", "mediano", "grande"), // 🔥 mejor que string libre
        allowNull: false
    },


    // --------------------------------------------------
    // ENERGÍA
    // --------------------------------------------------

    energia: {
        type: DataTypes.ENUM("baja", "media", "alta"), // 🔥 control total
        allowNull: false
    },


    // --------------------------------------------------
    // DESCRIPCIÓN
    // --------------------------------------------------

    descripcion: {
        type: DataTypes.TEXT,             // texto largo
        allowNull: false,
        validate: {
            len: {
                args: [10, 1000],
                msg: "La descripción debe tener entre 10 y 1000 caracteres"
            }
        }
    },


    // --------------------------------------------------
    // IMAGEN
    // --------------------------------------------------

    imagen: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "default.jpg" // 🔥 fallback pro
    },


    // --------------------------------------------------
    // ESTADO
    // --------------------------------------------------

    estado: {
        type: DataTypes.ENUM("disponible", "adoptado"),
        defaultValue: "disponible"
    },


    // --------------------------------------------------
    // USER ID (FOREIGN KEY)
    // --------------------------------------------------

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: true
        }
    }

}, {

    // --------------------------------------------------
    // CONFIGURACIÓN DEL MODELO
    // --------------------------------------------------

    tableName: "mascotas",     // nombre real en DB
    timestamps: true,          // createdAt / updatedAt

    // --------------------------------------------------
    // ÍNDICES (🔥 NIVEL PRO)
    // --------------------------------------------------

    indexes: [
        {
            fields: ["estado"] // búsquedas rápidas por estado
        },
        {
            fields: ["userId"] // consultas por usuario
        }
    ]

});


// ------------------------------------------------------
// HOOKS (🔥 NIVEL SENIOR)
// ------------------------------------------------------

Mascota.beforeCreate((mascota) => {

    // Normalizar texto (buena práctica)
    if (mascota.nombre) {
        mascota.nombre = mascota.nombre.trim();
    }

});


// ------------------------------------------------------
// EXPORTAR MODELO
// ------------------------------------------------------

module.exports = Mascota;