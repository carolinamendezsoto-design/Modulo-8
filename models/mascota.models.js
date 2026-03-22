// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

// Importamos los tipos de datos de Sequelize (STRING, INTEGER, etc.)
const { DataTypes } = require("sequelize");

// Importamos la instancia de conexión a la base de datos
const { sequelize } = require("../config/database");

// Importamos modelos relacionados para crear relaciones
const User = require("./user.models");
const Solicitud = require("./solicitud.models");


// ------------------------------------------------------
// DEFINICIÓN DEL MODELO MASCOTA
// ------------------------------------------------------

// Definimos el modelo Mascota (tabla en la base de datos)
const Mascota = sequelize.define("Mascota", {

    // ID único de cada mascota
    id: {
        type: DataTypes.INTEGER,      // tipo numérico
        primaryKey: true,             // clave primaria
        autoIncrement: true           // autoincremental
    },

    // Nombre de la mascota
    nombre: {
        type: DataTypes.STRING,       // texto corto
        allowNull: false              // obligatorio
    },

    // Edad de la mascota
    edad: {
        type: DataTypes.INTEGER,      // número entero
        allowNull: false              // obligatorio
    },

    // Tamaño o porte
    porte: {
        type: DataTypes.STRING,       // texto
        allowNull: false              // obligatorio
    },

    // Nivel de energía
    energia: {
        type: DataTypes.STRING,       // texto
        allowNull: false              // obligatorio
    },

    // Descripción de la mascota
    descripcion: {
        type: DataTypes.TEXT,         // texto largo
        allowNull: false              // obligatorio
    },

    // Imagen (nombre del archivo subido con multer)
    imagen: {
        type: DataTypes.STRING        // opcional
    },

    // Estado de adopción
    estado: {
        type: DataTypes.STRING,       // texto
        defaultValue: "disponible",   // valor inicial
        validate: {
            isIn: [["disponible", "adoptado"]] // valores permitidos
        }
    },

    // ID del usuario (rescatista que publica)
    userId: {
        type: DataTypes.INTEGER,      // número
        allowNull: false              // obligatorio
    }

}, {
    timestamps: true // agrega createdAt y updatedAt automáticamente
});


// ------------------------------------------------------
// RELACIONES
// ------------------------------------------------------

// Una mascota pertenece a un usuario (rescatista)
Mascota.belongsTo(User, {
    foreignKey: "userId",   // clave foránea
    as: "rescatista"        // alias para consultas
});

// Un usuario puede tener muchas mascotas
User.hasMany(Mascota, {
    foreignKey: "userId",
    as: "mascotas"
});

// Una mascota puede tener muchas solicitudes
Mascota.hasMany(Solicitud, {
    foreignKey: "mascotaId",
    as: "solicitudes"
});


// ------------------------------------------------------
// EXPORTAR MODELO
// ------------------------------------------------------

// Exportamos el modelo para usarlo en controllers y services
module.exports = Mascota;