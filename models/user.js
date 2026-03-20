// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

// Importamos Sequelize
const { DataTypes } = require("sequelize");

// Importamos la conexión a la base de datos
const { sequelize } = require("../config/database");


// ------------------------------------------------------
// DEFINIR MODELO USER
// ------------------------------------------------------

const User = sequelize.define("User", {

    // ID del usuario (clave primaria)
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    // Nombre del usuario
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },

    // Email del usuario
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    // Contraseña encriptada
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    // --------------------------------------------------
    // 🔥 NUEVO CAMPO: ROL
    // --------------------------------------------------

    rol: {
        type: DataTypes.STRING, // tipo texto
        defaultValue: "usuario" // por defecto será usuario normal
    }

}, {
    tableName: "users"
});


// ------------------------------------------------------
// EXPORTAR MODELO
// ------------------------------------------------------

module.exports = User;