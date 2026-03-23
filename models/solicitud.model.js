// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");


// ------------------------------------------------------
// DEFINICIÓN DEL MODELO
// ------------------------------------------------------

const Solicitud = sequelize.define("Solicitud", {

    // ID
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    // FK MASCOTA
    mascotaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: {
                msg: "mascotaId debe ser un número entero"
            }
        }
    },

    // FK ADOPTANTE
    adoptanteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: {
                msg: "adoptanteId debe ser un número entero"
            }
        }
    },

    // MENSAJE
    mensaje: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
            len: {
                args: [0, 500],
                msg: "El mensaje no puede superar los 500 caracteres"
            }
        }
    },

    // ESTADO
    estado: {
        type: DataTypes.ENUM("pendiente", "aprobado", "rechazado"),
        defaultValue: "pendiente"
    }

}, {

    tableName: "solicitudes",
    timestamps: true,

    indexes: [
        {
            unique: true,
            fields: ["mascotaId", "adoptanteId"]
        },
        {
            fields: ["estado"]
        }
    ]
});


// ------------------------------------------------------
// HOOKS
// ------------------------------------------------------

Solicitud.beforeCreate((solicitud) => {

    if (solicitud.mensaje) {
        solicitud.mensaje = solicitud.mensaje.trim();
    }
});


// ------------------------------------------------------
// EXPORTAR
// ------------------------------------------------------

module.exports = Solicitud;