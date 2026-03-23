// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

// Importamos tipos de datos de Sequelize
const { DataTypes } = require("sequelize");

// Importamos la conexión a la base de datos
const { sequelize } = require("../config/database");

// Importamos bcrypt para encriptar contraseñas
const bcrypt = require("bcrypt");


// ------------------------------------------------------
// DEFINICIÓN DEL MODELO USER
// ------------------------------------------------------

// Definimos el modelo User (tabla en la BD)
const User = sequelize.define("User", {

    // --------------------------------------------------
    // ID
    // --------------------------------------------------

    // Identificador único del usuario
    id: {
        type: DataTypes.INTEGER,   // número entero
        primaryKey: true,          // clave primaria
        autoIncrement: true        // autoincremental
    },

    // --------------------------------------------------
    // NOMBRE
    // --------------------------------------------------

    // Nombre del usuario
    nombre: {
        type: DataTypes.STRING,    // texto corto
        allowNull: false,          // obligatorio
        validate: {
            notEmpty: true         // no permite vacío
        }
    },

    // --------------------------------------------------
    // EMAIL
    // --------------------------------------------------

    // Email del usuario (único)
    email: {
        type: DataTypes.STRING,    // texto
        allowNull: false,          // obligatorio
        unique: true,              // no se puede repetir
        validate: {
            isEmail: true,         // validación automática
            notEmpty: true
        }
    },

    // --------------------------------------------------
    // PASSWORD
    // --------------------------------------------------

    // Contraseña (se guarda encriptada)
    password: {
        type: DataTypes.STRING,    // texto
        allowNull: false,          // obligatorio
        validate: {
            len: [6, 100]          // mínimo 6 caracteres
        }
    },

    // --------------------------------------------------
    // TELÉFONO
    // --------------------------------------------------

    // Número de contacto del usuario
    telefono: {
        type: DataTypes.STRING,    // texto
        allowNull: false,          // obligatorio
        validate: {
            notEmpty: true
        }
    },

    // --------------------------------------------------
    // ROL
    // --------------------------------------------------

    // Rol del usuario dentro del sistema
    rol: {
        type: DataTypes.ENUM("admin", "rescatista", "adoptante"), // ENUM profesional
        defaultValue: "adoptante" // valor por defecto
    }

}, {

    // --------------------------------------------------
    // CONFIGURACIÓN DEL MODELO
    // --------------------------------------------------

    tableName: "users", // nombre de tabla en BD

    timestamps: true // createdAt y updatedAt
});


// ------------------------------------------------------
// HOOK: ENCRIPTAR PASSWORD ANTES DE GUARDAR
// ------------------------------------------------------

// Antes de crear un usuario en la BD
User.beforeCreate(async (user) => {

    // Generamos un "salt" (nivel de seguridad)
    const salt = await bcrypt.genSalt(10);

    // Encriptamos la contraseña usando bcrypt
    user.password = await bcrypt.hash(user.password, salt);
});


// ------------------------------------------------------
// MÉTODO PERSONALIZADO (🔥 PRO)
// ------------------------------------------------------

// Método para comparar contraseñas (login)
User.prototype.comparePassword = async function (password) {

    // Comparamos password ingresado con el hash almacenado
    return await bcrypt.compare(password, this.password);
};


// ------------------------------------------------------
// EXPORTAR MODELO
// ------------------------------------------------------

// Exportamos modelo para usar en services/controllers
module.exports = User;