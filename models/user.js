// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

// Importamos bcrypt para encriptar contraseña
const bcrypt = require("bcrypt");


// ------------------------------------------------------
// DEFINICIÓN DEL MODELO USER
// ------------------------------------------------------

const User = sequelize.define("User", {

    // ID único del usuario
    id: {
        type: DataTypes.INTEGER,       // número
        primaryKey: true,              // clave primaria
        autoIncrement: true            // autoincremental
    },

    // Nombre del usuario
    nombre: {
        type: DataTypes.STRING,
        allowNull: false               // obligatorio
    },

    // Email único
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,                 // no se puede repetir
        validate: {
            isEmail: true             // validación automática
        }
    },

    // Contraseña (encriptada)
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    // Teléfono
    telefono: {
        type: DataTypes.STRING,
        allowNull: false
    },

    // Rol del usuario
    rol: {
        type: DataTypes.ENUM("admin", "rescatista", "adoptante"), // ENUM pro
        defaultValue: "adoptante"
    }

}, {
    tableName: "users",
    timestamps: true
});


// ------------------------------------------------------
// HOOK: ENCRIPTAR PASSWORD ANTES DE GUARDAR
// ------------------------------------------------------

User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10);      // generamos salt
    user.password = await bcrypt.hash(user.password, salt); // hash
});


// ------------------------------------------------------
// EXPORTAR MODELO
// ------------------------------------------------------

module.exports = User;