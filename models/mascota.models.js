// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");


// ------------------------------------------------------
// DEFINICIÓN DEL MODELO
// ------------------------------------------------------

const Mascota = sequelize.define("Mascota", {

    // ID
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    // NOMBRE
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "El nombre no puede estar vacío"
            },
            len: {
                args: [2, 50],
                msg: "El nombre debe tener entre 2 y 50 caracteres"
            }
        }
    },

    // EDAD
    edad: {
        type: DataTypes.INTEGER,
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

    // PORTE
    porte: {
        type: DataTypes.ENUM("pequeño", "mediano", "grande"),
        allowNull: false
    },

    // ENERGÍA
    energia: {
        type: DataTypes.ENUM("baja", "media", "alta"),
        allowNull: false
    },

    // DESCRIPCIÓN
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: {
                args: [10, 1000],
                msg: "La descripción debe tener entre 10 y 1000 caracteres"
            }
        }
    },

    // IMAGEN
    imagen: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "default.jpg"
    },

    // ESTADO
    estado: {
        type: DataTypes.ENUM("disponible", "adoptado"),
        defaultValue: "disponible"
    },

    // FK USER
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: {
                msg: "userId debe ser un número entero"
            }
        }
    }

}, {

    tableName: "mascotas",
    timestamps: true,

    indexes: [
        { fields: ["estado"] },
        { fields: ["userId"] }
    ]
});


// ------------------------------------------------------
// HOOKS
// ------------------------------------------------------

Mascota.beforeCreate((mascota) => {

    if (mascota.nombre) {
        mascota.nombre = mascota.nombre.trim();
    }

    if (mascota.descripcion) {
        mascota.descripcion = mascota.descripcion.trim();
    }
});


// ------------------------------------------------------
// EXPORTAR
// ------------------------------------------------------

module.exports = Mascota;