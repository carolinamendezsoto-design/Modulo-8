// ------------------------------------------------------
// IMPORTAR MODELO
// ------------------------------------------------------

// Importamos el modelo Mascota desde Sequelize
const { Mascota } = require("../models");


// =======================================================
// OBTENER TODAS LAS MASCOTAS
// =======================================================

const getMascotas = async (filtros = {}) => {

    // Retornamos mascotas con filtros
    return await Mascota.findAll({
        where: filtros
    });
};


// =======================================================
// OBTENER POR ID
// =======================================================

const getMascotaById = async (id) => {

    // Buscamos mascota por PK
    return await Mascota.findByPk(id);
};


// =======================================================
// CREAR
// =======================================================

const createMascota = async (data) => {

    // Creamos nueva mascota
    return await Mascota.create(data);
};


// =======================================================
// ACTUALIZAR
// =======================================================

const updateMascota = async (id, data) => {

    // Buscamos mascota
    const mascota = await Mascota.findByPk(id);

    // Si no existe
    if (!mascota) return null;

    // Actualizamos datos
    await mascota.update(data);

    return mascota;
};


// =======================================================
// ELIMINAR
// =======================================================

const deleteMascota = async (id) => {

    // Eliminamos por ID
    const deleted = await Mascota.destroy({
        where: { id }
    });

    return deleted;
};


// =======================================================
// 🔥 FUNCIÓN QUE FALTABA (CLAVE)
// =======================================================

const updateEstadoMascota = async (id, estado) => {

    // Buscamos mascota
    const mascota = await Mascota.findByPk(id);

    // Si no existe
    if (!mascota) return null;

    // Cambiamos estado (ej: disponible → adoptado)
    mascota.estado = estado;

    // Guardamos cambios
    await mascota.save();

    // Retornamos mascota actualizada
    return mascota;
};


// ------------------------------------------------------
// EXPORTAR
// ------------------------------------------------------

module.exports = {
    getMascotas,
    getMascotaById,
    createMascota,
    updateMascota,
    deleteMascota,
    updateEstadoMascota // 🔥 ESTE ERA EL QUE FALTABA
};