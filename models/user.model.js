// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

// Importamos tipos de datos de Sequelize
const { DataTypes } = require("sequelize");

// Importamos instancia de conexión a la base de datos
const { sequelize } = require("../config/database");


// ------------------------------------------------------
// DEFINICIÓN DEL MODELO USER
// ------------------------------------------------------

// Definimos modelo "User"
const User = sequelize.define("User", {

    // --------------------------------------------------
    // ID (PRIMARY KEY)
    // --------------------------------------------------

    id: {
        type: DataTypes.INTEGER,     // Tipo entero
        primaryKey: true,            // Clave primaria
        autoIncrement: true          // Se incrementa automáticamente
    },

    // --------------------------------------------------
    // NOMBRE
    // --------------------------------------------------

    nombre: {
        type: DataTypes.STRING,      // Texto
        allowNull: false             // No puede ser nulo
    },

    // --------------------------------------------------
    // EMAIL
    // --------------------------------------------------

    email: {
        type: DataTypes.STRING,      // Texto
        allowNull: false,            // Obligatorio
        unique: true                 // No se puede repetir
    },

    // --------------------------------------------------
    // PASSWORD
    // --------------------------------------------------

    password: {
        type: DataTypes.STRING,      // Texto
        allowNull: false             // Obligatorio

        // 🔥 IMPORTANTE:
        // Aquí NO encriptamos nada
        // El password YA viene encriptado desde el service
    },

    // --------------------------------------------------
    // TELÉFONO
    // --------------------------------------------------

    telefono: {
        type: DataTypes.STRING,      // Texto
        allowNull: false             // Obligatorio
    },

    // --------------------------------------------------
    // ROL
    // --------------------------------------------------

    rol: {
        type: DataTypes.ENUM("admin", "rescatista", "adoptante"), // Valores permitidos
        defaultValue: "adoptante" // Valor por defecto
    }

}, {
    tableName: "users",  // Nombre real en la BD
    timestamps: true     // createdAt y updatedAt automáticos
});


// ------------------------------------------------------
// EXPORTAR MODELO
// ------------------------------------------------------

module.exports = User;