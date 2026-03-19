// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

// Importamos DataTypes desde Sequelize
// Permite definir los tipos de datos de cada campo
const { DataTypes } = require("sequelize");

// Importamos la conexión a la base de datos
// sequelize es la instancia configurada previamente
const { sequelize } = require("../config/database");


// ------------------------------------------------------
// DEFINICIÓN DEL MODELO MASCOTA
// ------------------------------------------------------

// Definimos el modelo "Mascota"
// Representa la tabla "Mascotas" en PostgreSQL
const Mascota = sequelize.define("Mascota", {

    // ---------------------------------
    // ID DE LA MASCOTA
    // ---------------------------------

    id: {

        // Tipo entero
        type: DataTypes.INTEGER,

        // Clave primaria
        primaryKey: true,

        // Se incrementa automáticamente
        autoIncrement: true

    },


    // ---------------------------------
    // NOMBRE DE LA MASCOTA
    // ---------------------------------

    nombre: {

        // Texto corto (ej: "Luna")
        type: DataTypes.STRING,

        // Campo obligatorio
        allowNull: false

    },


    // ---------------------------------
    // EDAD DE LA MASCOTA
    // ---------------------------------

    edad: {

        // Número entero (años)
        type: DataTypes.INTEGER,

        // Campo obligatorio
        allowNull: false

    },


    // ---------------------------------
    // PORTE DE LA MASCOTA
    // ---------------------------------

    porte: {

        // Texto (ej: pequeño, mediano, grande)
        type: DataTypes.STRING,

        // Campo obligatorio
        allowNull: false

    },


    // ---------------------------------
    // NIVEL DE ENERGÍA
    // ---------------------------------

    energia: {

        // Texto (ej: baja, media, alta)
        type: DataTypes.STRING,

        // Campo obligatorio
        allowNull: false

    },


    // ---------------------------------
    // DESCRIPCIÓN DEL PELUDITO
    // ---------------------------------

    descripcion: {

        // Texto largo para describir personalidad
        type: DataTypes.TEXT,

        // Campo obligatorio
        allowNull: false

    },


    // ---------------------------------
    // IMAGEN DE LA MASCOTA
    // ---------------------------------

    imagen: {

        // Guarda el nombre del archivo (multer)
        type: DataTypes.STRING

        // No es obligatorio
    },


    // ---------------------------------
    // ESTADO DE ADOPCIÓN
    // ---------------------------------

    estado: {

        // Texto (disponible / adoptado)
        type: DataTypes.STRING,

        // Valor por defecto
        defaultValue: "disponible"

    },


    // ---------------------------------
    // RELACIÓN CON USUARIO (RESCATISTA)
    // ---------------------------------

    userId: {

        // ID del usuario que publica
        type: DataTypes.INTEGER,

        // Campo obligatorio
        allowNull: false

    }

},

{
    // --------------------------------------------------
    // CONFIGURACIÓN DEL MODELO
    // --------------------------------------------------

    // Sequelize agregará:
    // createdAt y updatedAt automáticamente
    timestamps: true

});


// ------------------------------------------------------
// EXPORTAR MODELO
// ------------------------------------------------------

// Exportamos el modelo para usarlo en el proyecto
module.exports = Mascota;