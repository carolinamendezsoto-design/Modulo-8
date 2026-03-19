// ------------------------------------------------------
// IMPORTAR MODELO
// ------------------------------------------------------

// Importamos el modelo Mascota desde Sequelize
// Este modelo representa la tabla en la base de datos
const Mascota = require("../models/mascota");


// =======================================================
// OBTENER TODAS LAS MASCOTAS
// =======================================================

// Función que obtiene todas las mascotas
// Puede recibir filtros (query) en el futuro
const getMascotas = async (query) => {

    // Usamos findAll para traer todos los registros
    return await Mascota.findAll();

};


// =======================================================
// OBTENER MASCOTA POR ID
// =======================================================

// Función que busca una mascota por su ID
const getMascotaById = async (id) => {

    // findByPk busca por primary key (id)
    return await Mascota.findByPk(id);

};


// =======================================================
// CREAR MASCOTA
// =======================================================

// Función que crea una nueva mascota en la base de datos
const createMascota = async (data) => {

    // create inserta un nuevo registro
    return await Mascota.create(data);

};


// =======================================================
// ACTUALIZAR MASCOTA
// =======================================================

// Función que actualiza una mascota existente
const updateMascota = async (id, data) => {

    // update modifica los campos según el id
    await Mascota.update(data, {
        where: { id }
    });

    // Retornamos la mascota actualizada
    return await Mascota.findByPk(id);

};


// =======================================================
// ELIMINAR MASCOTA
// =======================================================

// Función que elimina una mascota
const deleteMascota = async (id) => {

    // destroy elimina el registro según el id
    return await Mascota.destroy({
        where: { id }
    });

};


// ------------------------------------------------------
// EXPORTAR REPOSITORY
// ------------------------------------------------------

// Exportamos todas las funciones para usarlas en el service
module.exports = {
    getMascotas,
    getMascotaById,
    createMascota,
    updateMascota,
    deleteMascota
};