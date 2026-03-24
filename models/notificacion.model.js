// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

const { DataTypes } = require("sequelize"); // Tipos de datos
const { sequelize } = require("../config/database"); // Conexión


// ------------------------------------------------------
// MODELO NOTIFICACION
// ------------------------------------------------------

const Notificacion = sequelize.define("Notificacion", {

    // ID único
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    // Usuario destino
    usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    // Mensaje
    mensaje: {
        type: DataTypes.STRING,
        allowNull: false
    },

    // Leído o no
    leido: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }

}, {

    tableName: "notificaciones",
    timestamps: true
});


// ------------------------------------------------------
// EXPORTAR
// ------------------------------------------------------

module.exports = Notificacion;