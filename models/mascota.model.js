// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

// Importamos DataTypes de Sequelize para definir tipos de datos
const { DataTypes } = require("sequelize");

// Importamos la conexión a la base de datos
const { sequelize } = require("../config/database");


// ------------------------------------------------------
// DEFINICIÓN DEL MODELO
// ------------------------------------------------------

// Definimos el modelo Mascota
const Mascota = sequelize.define("Mascota", {

    // --------------------------------------------------
    // ID (PRIMARY KEY)
    // --------------------------------------------------
    id: {
        type: DataTypes.INTEGER, // número entero
        primaryKey: true, // clave primaria
        autoIncrement: true // autoincremental
    },

    // --------------------------------------------------
    // NOMBRE
    // --------------------------------------------------
    nombre: {
        type: DataTypes.STRING, // texto corto
        allowNull: false // obligatorio
    },

    // --------------------------------------------------
    // 🔥 RAZA (NUEVO CAMPO)
    // --------------------------------------------------
    raza: {
        type: DataTypes.STRING, // texto
        allowNull: false // obligatorio
    },

    // --------------------------------------------------
    // 🔥 EDAD (STRING → porque usas "2 años 3 meses")
    // --------------------------------------------------
    edad: {
        type: DataTypes.STRING, // texto
        allowNull: false // obligatorio
    },

    // --------------------------------------------------
    // PORTE
    // --------------------------------------------------
    porte: {
        type: DataTypes.STRING, // texto (pequeño, mediano, grande)
        allowNull: false
    },

    // --------------------------------------------------
    // ENERGÍA
    // --------------------------------------------------
    energia: {
        type: DataTypes.STRING, // texto (baja, media, alta)
        allowNull: false
    },

    // --------------------------------------------------
    // DESCRIPCIÓN
    // --------------------------------------------------
    descripcion: {
        type: DataTypes.TEXT, // texto largo
        allowNull: false
    },

    // --------------------------------------------------
    // IMAGEN
    // --------------------------------------------------
    imagen: {
        type: DataTypes.STRING, // nombre archivo
        allowNull: true, // opcional
        defaultValue: "default.jpg" // imagen por defecto
    },

    // --------------------------------------------------
    // ESTADO
    // --------------------------------------------------
    estado: {
        type: DataTypes.STRING, // disponible / adoptado
        defaultValue: "disponible"
    },

    // --------------------------------------------------
    // USER ID (FK)
    // --------------------------------------------------
    userId: {
        type: DataTypes.INTEGER, // id usuario
        allowNull: false
    }

}, {

    tableName: "mascotas", // nombre tabla
    timestamps: true // createdAt / updatedAt

});


// ------------------------------------------------------
// EXPORTAR MODELO
// ------------------------------------------------------

module.exports = Mascota;