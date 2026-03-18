// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

// Importamos DataTypes desde Sequelize.
// DataTypes permite definir los tipos de datos de cada columna.
const { DataTypes } = require("sequelize");

// Importamos la conexión a la base de datos.
// sequelize es la instancia configurada en config/database.js.
const { sequelize } = require("../config/database");


// ------------------------------------------------------
// DEFINICIÓN DEL MODELO POST
// ------------------------------------------------------

// Definimos el modelo "Post".
// Este modelo representa la tabla "Posts" en PostgreSQL.
const Post = sequelize.define("Post", {

    // ---------------------------------
    // ID DEL POST
    // ---------------------------------

    id: {

        // Tipo de dato entero
        type: DataTypes.INTEGER,

        // Define este campo como clave primaria
        primaryKey: true,

        // Se incrementa automáticamente
        autoIncrement: true

    },


    // ---------------------------------
    // TÍTULO DEL POST
    // ---------------------------------

    titulo: {

        // Tipo texto
        type: DataTypes.STRING,

        // Campo obligatorio
        allowNull: false

    },


    // ---------------------------------
    // CONTENIDO DEL POST
    // ---------------------------------

    contenido: {

        // Tipo de dato TEXT (texto largo)
        type: DataTypes.TEXT,

        // Campo obligatorio
        allowNull: false

    },


    // ---------------------------------
    // RELACIÓN CON USUARIO
    // ---------------------------------

    userId: {

        // Tipo entero
        type: DataTypes.INTEGER,

        // Campo obligatorio
        allowNull: false

        // Este campo será la clave foránea que conecta
        // el post con el usuario que lo creó

    }

},

{
    // --------------------------------------------------
    // CONFIGURACIÓN DEL MODELO
    // --------------------------------------------------

    // Activa timestamps automáticos
    // Sequelize agregará createdAt y updatedAt
    timestamps: true

});


// ------------------------------------------------------
// EXPORTAR MODELO
// ------------------------------------------------------

// Exportamos el modelo para poder usarlo en rutas,
// controladores y consultas con Sequelize.
module.exports = Post;