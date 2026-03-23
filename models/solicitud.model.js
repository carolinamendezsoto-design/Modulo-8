// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

// Importamos tipos de datos de Sequelize
const { DataTypes } = require("sequelize");

// Importamos la instancia de conexión a la base de datos
const { sequelize } = require("../config/database");


// ------------------------------------------------------
// DEFINICIÓN DEL MODELO SOLICITUD
// ------------------------------------------------------

// Definimos el modelo "Solicitud" que representa la tabla "solicitudes"
const Solicitud = sequelize.define("Solicitud", {

    // --------------------------------------------------
    // ID (CLAVE PRIMARIA)
    // --------------------------------------------------

    // Identificador único de la solicitud
    id: {
        type: DataTypes.INTEGER,        // Tipo entero
        primaryKey: true,               // Clave primaria
        autoIncrement: true             // Se incrementa automáticamente
    },


    // --------------------------------------------------
    // FK MASCOTA
    // --------------------------------------------------

    // ID de la mascota a la que se está postulando
    mascotaId: {
        type: DataTypes.INTEGER,        // Tipo entero
        allowNull: false,               // Obligatorio

        // Validaciones
        validate: {
            isInt: {
                msg: "mascotaId debe ser un número entero"
            }
        }
    },


    // --------------------------------------------------
    // FK ADOPTANTE (USUARIO)
    // --------------------------------------------------

    // ID del usuario que quiere adoptar
    adoptanteId: {
        type: DataTypes.INTEGER,        // Tipo entero
        allowNull: false,               // Obligatorio

        // Validaciones
        validate: {
            isInt: {
                msg: "adoptanteId debe ser un número entero"
            }
        }
    },


    // --------------------------------------------------
    // MENSAJE
    // --------------------------------------------------

    // Mensaje opcional del adoptante
    mensaje: {
        type: DataTypes.TEXT,           // Texto largo
        allowNull: true,                // Puede ser null

        // Validación de largo
        validate: {
            len: {
                args: [0, 500],        // Máximo 500 caracteres
                msg: "El mensaje no puede superar los 500 caracteres"
            }
        }
    },


    // --------------------------------------------------
    // ESTADO DE LA SOLICITUD
    // --------------------------------------------------

    // Estado del proceso de adopción
    estado: {
        type: DataTypes.ENUM("pendiente", "aprobado", "rechazado"), // Valores posibles
        allowNull: false,           // 🔥 IMPORTANTE: siempre debe existir
        defaultValue: "pendiente"   // Valor por defecto
    }

}, {

    // --------------------------------------------------
    // CONFIGURACIÓN DEL MODELO
    // --------------------------------------------------

    tableName: "solicitudes",   // Nombre de la tabla en la BD

    timestamps: true,           // createdAt y updatedAt automáticos


    // --------------------------------------------------
    // ÍNDICES (OPTIMIZACIÓN)
    // --------------------------------------------------

    indexes: [

        {
            // 🔥 Evita duplicados:
            // un usuario NO puede postular 2 veces a la misma mascota
            unique: true,
            fields: ["mascotaId", "adoptanteId"]
        },

        {
            // Índice para búsquedas por estado (más rápido)
            fields: ["estado"]
        }

    ]

});


// ------------------------------------------------------
// HOOKS (ANTES DE CREAR)
// ------------------------------------------------------

// Hook que se ejecuta antes de insertar en la BD
Solicitud.beforeCreate((solicitud) => {

    // Si existe mensaje
    if (solicitud.mensaje) {

        // Eliminamos espacios innecesarios al inicio y final
        solicitud.mensaje = solicitud.mensaje.trim();
    }

});


// ------------------------------------------------------
// EXPORTAR MODELO
// ------------------------------------------------------

// Exportamos para usarlo en repository, services, etc.
module.exports = Solicitud;