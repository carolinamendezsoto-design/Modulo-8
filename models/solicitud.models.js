// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

// Importamos tipos de datos de Sequelize
const { DataTypes } = require("sequelize");

// Importamos la conexión a la base de datos
const { sequelize } = require("../config/database");


// ------------------------------------------------------
// DEFINICIÓN DEL MODELO SOLICITUD
// ------------------------------------------------------

// Definimos el modelo Solicitud (tabla en la BD)
const Solicitud = sequelize.define("Solicitud", {

    // --------------------------------------------------
    // ID
    // --------------------------------------------------

    // Identificador único de la solicitud
    id: {
        type: DataTypes.INTEGER,   // número entero
        primaryKey: true,          // clave primaria
        autoIncrement: true        // autoincremental
    },

    // --------------------------------------------------
    // MASCOTA ID (FK)
    // --------------------------------------------------

    // ID de la mascota a la que se postula
    mascotaId: {
        type: DataTypes.INTEGER,   // número
        allowNull: false,          // obligatorio
        validate: {
            isInt: true            // debe ser entero
        }
    },

    // --------------------------------------------------
    // ADOPTANTE ID (FK)
    // --------------------------------------------------

    // ID del usuario que realiza la solicitud
    adoptanteId: {
        type: DataTypes.INTEGER,   // número
        allowNull: false,          // obligatorio
        validate: {
            isInt: true            // validación
        }
    },

    // --------------------------------------------------
    // MENSAJE
    // --------------------------------------------------

    // Mensaje opcional del adoptante
    mensaje: {
        type: DataTypes.TEXT,      // texto largo
        allowNull: true,           // opcional
        validate: {
            len: [0, 500]          // máximo 500 caracteres
        }
    },

    // --------------------------------------------------
    // ESTADO
    // --------------------------------------------------

    // Estado de la solicitud
    estado: {
        type: DataTypes.ENUM("pendiente", "aprobado", "rechazado"), // ENUM profesional
        defaultValue: "pendiente" // estado inicial
    }

}, {

    // --------------------------------------------------
    // CONFIGURACIÓN DEL MODELO
    // --------------------------------------------------

    tableName: "solicitudes", // nombre de la tabla en BD

    timestamps: true, // createdAt y updatedAt

    // --------------------------------------------------
    // RESTRICCIÓN ÚNICA (🔥 CLAVE PARA EL 7)
    // --------------------------------------------------

    indexes: [
        {
            unique: true, // hace única la combinación
            fields: ["mascotaId", "adoptanteId"] // evita duplicados
        }
    ]
});


// ------------------------------------------------------
// EXPORTAR MODELO
// ------------------------------------------------------

// Exportamos modelo para usar en controllers/services
module.exports = Solicitud;