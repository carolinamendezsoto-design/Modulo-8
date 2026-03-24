// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");


// ------------------------------------------------------
// MODELO SOLICITUD
// ------------------------------------------------------

const Solicitud = sequelize.define("Solicitud", {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    // --------------------------------------------------
    // FK MASCOTA
    // --------------------------------------------------

    mascotaId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    // --------------------------------------------------
    // 🔥 FK ADOPTANTE (ANTES usuarioId)
    // --------------------------------------------------

    adoptanteId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    // --------------------------------------------------
    // MENSAJE
    // --------------------------------------------------

    mensaje: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    // --------------------------------------------------
    // ESTADO
    // --------------------------------------------------

    estado: {
        type: DataTypes.ENUM("pendiente", "aprobado", "rechazado"),
        defaultValue: "pendiente"
    }

}, {

    tableName: "solicitudes",
    timestamps: true
});


// ------------------------------------------------------
// EXPORTAR
// ------------------------------------------------------

module.exports = Solicitud;