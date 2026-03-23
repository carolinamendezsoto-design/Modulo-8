// ------------------------------------------------------
// IMPORTAR MODELO
// ------------------------------------------------------

// Importamos el modelo Mascota desde Sequelize
// ⚠️ Asegúrate que la ruta coincida con tu estructura real
const { Mascota } = require("../models"); 
// 👆 Mejor práctica: importar desde index.js de models


// =======================================================
// OBTENER TODAS LAS MASCOTAS
// =======================================================

// Función que obtiene todas las mascotas
// Puede recibir filtros en el futuro (estado, usuario, etc.)
const getMascotas = async (query = {}) => {

    // Retornamos todas las mascotas
    // 👇 dejamos preparado "where" para filtros dinámicos
    return await Mascota.findAll({
        where: query
    });

};


// =======================================================
// OBTENER MASCOTA POR ID
// =======================================================

// Función que busca una mascota por su ID
const getMascotaById = async (id) => {

    // Buscamos por clave primaria
    return await Mascota.findByPk(id);

};


// =======================================================
// CREAR MASCOTA
// =======================================================

// Función que crea una nueva mascota
const createMascota = async (data) => {

    // Insertamos un nuevo registro
    return await Mascota.create(data);

};


// =======================================================
// ACTUALIZAR MASCOTA
// =======================================================

// Función que actualiza una mascota existente
const updateMascota = async (id, data) => {

    // Actualizamos los datos
    const [updated] = await Mascota.update(data, {
        where: { id }
    });

    // Si no se actualizó nada, retornamos null
    if (!updated) return null;

    // Retornamos la mascota actualizada
    return await Mascota.findByPk(id);

};


// =======================================================
// ELIMINAR MASCOTA
// =======================================================

// Función que elimina una mascota
const deleteMascota = async (id) => {

    // Eliminamos por id
    const deleted = await Mascota.destroy({
        where: { id }
    });

    // Retornamos true/false (más útil que número)
    return deleted > 0;

};


// =======================================================
// CAMBIAR ESTADO DE MASCOTA (🔥 IMPORTANTE PARA TU FLUJO)
// =======================================================

const updateEstadoMascota = async (id, estado) => {

    // Cambiamos solo el estado (disponible → adoptado)
    const [updated] = await Mascota.update(
        { estado },
        { where: { id } }
    );

    if (!updated) return null;

    return await Mascota.findByPk(id);

};


// ------------------------------------------------------
// EXPORTAR REPOSITORY
// ------------------------------------------------------

module.exports = {
    getMascotas,
    getMascotaById,
    createMascota,
    updateMascota,
    deleteMascota,
    updateEstadoMascota // 🔥 nuevo método clave
};