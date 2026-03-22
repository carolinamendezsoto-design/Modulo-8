// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");


// ------------------------------------------------------
// DEFINICIÓN DEL MODELO SOLICITUD
// ------------------------------------------------------

const Solicitud = sequelize.define("Solicitud", {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    mascotaId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    adoptanteId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    mensaje: {
        type: DataTypes.TEXT
    },

    estado: {
        type: DataTypes.ENUM("pendiente", "aprobado", "rechazado"), // ENUM PRO
        defaultValue: "pendiente"
    }

}, {
    tableName: "solicitudes",
    timestamps: true,

    // --------------------------------------------------
    // RESTRICCIÓN: EVITAR POSTULACIONES DUPLICADAS
    // --------------------------------------------------

    indexes: [
        {
            unique: true,
            fields: ["mascotaId", "adoptanteId"] // combinación única
        }
    ]
});


// ------------------------------------------------------
// EXPORTAR MODELO
// ------------------------------------------------------

module.exports = Solicitud;