// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");


// ------------------------------------------------------
// DEFINICIÓN DEL MODELO
// ------------------------------------------------------

const Solicitud = sequelize.define("Solicitud", {

    // --------------------------------------------------
    // ID
    // --------------------------------------------------

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },


    // --------------------------------------------------
    // MASCOTA ID (FK)
    // --------------------------------------------------

    mascotaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: {
                msg: "mascotaId debe ser un número entero"
            }
        }
    },


    // --------------------------------------------------
    // ADOPTANTE ID (FK)
    // --------------------------------------------------

    adoptanteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: {
                msg: "adoptanteId debe ser un número entero"
            }
        }
    },


    // --------------------------------------------------
    // MENSAJE
    // --------------------------------------------------

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


    // --------------------------------------------------
    // ESTADO
    // --------------------------------------------------

    estado: {
        type: DataTypes.ENUM("pendiente", "aprobado", "rechazado"),
        defaultValue: "pendiente"
    }

}, {

    // --------------------------------------------------
    // CONFIGURACIÓN
    // --------------------------------------------------

    tableName: "solicitudes",
    timestamps: true,

    // --------------------------------------------------
    // ÍNDICES (🔥 CLAVE PARA EL 7)
    // --------------------------------------------------

    indexes: [
        {
            unique: true,
            fields: ["mascotaId", "adoptanteId"] // evita duplicados
        },
        {
            fields: ["estado"] // mejora consultas
        }
    ]
});


// ------------------------------------------------------
// HOOKS (🔥 NIVEL PRO)
// ------------------------------------------------------

Solicitud.beforeCreate((solicitud) => {

    // Normalizar mensaje (si existe)
    if (solicitud.mensaje) {
        solicitud.mensaje = solicitud.mensaje.trim();
    }

});


// ------------------------------------------------------
// EXPORTAR
// ------------------------------------------------------

module.exports = Solicitud;