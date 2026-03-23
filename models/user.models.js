// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

// Tipos de datos de Sequelize
const { DataTypes } = require("sequelize");

// Conexión a la base de datos
const { sequelize } = require("../config/database");

// Librería para encriptar contraseñas
const bcrypt = require("bcrypt");


// ------------------------------------------------------
// DEFINICIÓN DEL MODELO USER
// ------------------------------------------------------

const User = sequelize.define("User", {

    // --------------------------------------------------
    // ID (CLAVE PRIMARIA)
    // --------------------------------------------------

    id: {
        type: DataTypes.INTEGER,        // número entero
        primaryKey: true,               // clave primaria
        autoIncrement: true             // autoincremental
    },


    // --------------------------------------------------
    // NOMBRE
    // --------------------------------------------------

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


    // --------------------------------------------------
    // EMAIL
    // --------------------------------------------------

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // evita duplicados
        validate: {
            isEmail: {
                msg: "Debe ser un email válido"
            },
            notEmpty: {
                msg: "El email es obligatorio"
            }
        }
    },


    // --------------------------------------------------
    // PASSWORD
    // --------------------------------------------------

    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [6, 100],
                msg: "La contraseña debe tener al menos 6 caracteres"
            }
        }
    },


    // --------------------------------------------------
    // TELÉFONO
    // --------------------------------------------------

    telefono: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "El teléfono es obligatorio"
            },
            len: {
                args: [8, 15],
                msg: "El teléfono debe tener entre 8 y 15 caracteres"
            }
        }
    },


    // --------------------------------------------------
    // ROL
    // --------------------------------------------------

    rol: {
        type: DataTypes.ENUM("admin", "rescatista", "adoptante"),
        defaultValue: "adoptante"
    }

}, {

    // --------------------------------------------------
    // CONFIGURACIÓN
    // --------------------------------------------------

    tableName: "users",
    timestamps: true,

    // 🔥 ÍNDICE PRO (mejora búsquedas por email)
    indexes: [
        {
            unique: true,
            fields: ["email"]
        }
    ]
});


// ------------------------------------------------------
// HOOK: ENCRIPTAR PASSWORD
// ------------------------------------------------------

User.beforeCreate(async (user) => {

    // Normalizar email
    user.email = user.email.toLowerCase().trim();

    // Generar salt
    const salt = await bcrypt.genSalt(10);

    // Encriptar password
    user.password = await bcrypt.hash(user.password, salt);
});


// 🔥 IMPORTANTE (nivel pro real)
// También en update si cambia password
User.beforeUpdate(async (user) => {

    if (user.changed("password")) {

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }
});


// ------------------------------------------------------
// MÉTODO PERSONALIZADO
// ------------------------------------------------------

User.prototype.comparePassword = async function (password) {

    return await bcrypt.compare(password, this.password);
};


// ------------------------------------------------------
// EXPORTAR
// ------------------------------------------------------

module.exports = User;