// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

// Importamos tipos de datos de Sequelize
const { DataTypes } = require("sequelize");

// Importamos conexión a DB
const { sequelize } = require("../config/database");

// Importamos bcrypt para encriptar
const bcryptjs = require("bcryptjs");


// ------------------------------------------------------
// DEFINICIÓN DEL MODELO USER
// ------------------------------------------------------

const User = sequelize.define("User", {

    // ID único
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    // Nombre del usuario
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

    // Email único
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: "Debe ser un email válido"
            },
            notEmpty: {
                msg: "El email es obligatorio"
            }
        }
    },

    // Password (se guardará encriptado)
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

    // Teléfono
    telefono: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "El teléfono es obligatorio"
            }
        }
    },

    // Rol
    rol: {
        type: DataTypes.ENUM("admin", "rescatista", "adoptante"),
        defaultValue: "adoptante"
    }

}, {
    tableName: "users",
    timestamps: true
});


// ------------------------------------------------------
// HOOK: ENCRIPTAR PASSWORD (CLAVE DEL PROBLEMA)
// ------------------------------------------------------

User.beforeCreate(async (user) => {

    // Normalizamos email
    user.email = user.email.toLowerCase().trim();

    // Generamos salt
    const salt = await bcryptjs.genSalt(10);

    // Encriptamos password
    user.password = await bcryptjs.hash(user.password, salt);
});


// También en update
User.beforeUpdate(async (user) => {

    if (user.changed("password")) {

        const salt = await bcryptjs.genSalt(10);

        user.password = await bcryptjs.hash(user.password, salt);
    }
});


// Método para comparar password
User.prototype.comparePassword = async function (password) {

    return await bcryptjs.compare(password, this.password);
};


// Exportamos modelo
module.exports = User;