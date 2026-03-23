// ------------------------------------------------------
// IMPORTAR MODELO
// ------------------------------------------------------

// Importamos el modelo desde el index de models (mejor práctica)
const db = require("../models");

// =======================================================
// OBTENER TODAS LAS MASCOTAS (CON FILTROS DINÁMICOS)
// =======================================================

const getMascotas = async (filters = {}) => {

    // --------------------------------------------------
    // VALIDACIÓN BÁSICA
    // --------------------------------------------------

    // Aseguramos que filters sea objeto
    if (typeof filters !== "object") {
        throw new Error("Los filtros deben ser un objeto");
    }

    // --------------------------------------------------
    // CONSULTA A BASE DE DATOS
    // --------------------------------------------------

    return await Mascota.findAll({
        where: filters, // Sequelize arma WHERE dinámico
        order: [["createdAt", "DESC"]] // 🔥 orden profesional
    });
};



// =======================================================
// OBTENER MASCOTA POR ID
// =======================================================

const getMascotaById = async (id) => {

    // --------------------------------------------------
    // VALIDACIÓN
    // --------------------------------------------------

    if (!id) {
        throw new Error("ID requerido en repository");
    }

    // --------------------------------------------------
    // CONSULTA
    // --------------------------------------------------

    return await Mascota.findByPk(id);
};



// =======================================================
// CREAR MASCOTA
// =======================================================

const createMascota = async (data) => {

    // --------------------------------------------------
    // VALIDACIÓN
    // --------------------------------------------------

    if (!data) {
        throw new Error("Datos requeridos para crear mascota");
    }

    // --------------------------------------------------
    // CREACIÓN
    // --------------------------------------------------

    return await Mascota.create(data);
};



// =======================================================
// ACTUALIZAR MASCOTA
// =======================================================

const updateMascota = async (id, data) => {

    // --------------------------------------------------
    // VALIDACIONES
    // --------------------------------------------------

    if (!id) {
        throw new Error("ID requerido para actualizar");
    }

    if (!data) {
        throw new Error("Datos requeridos para actualizar");
    }

    // --------------------------------------------------
    // UPDATE
    // --------------------------------------------------

    const [updated] = await Mascota.update(data, {
        where: { id }
    });

    // --------------------------------------------------
    // VERIFICAR RESULTADO
    // --------------------------------------------------

    if (!updated) return null;

    // --------------------------------------------------
    // RETORNAR REGISTRO ACTUALIZADO
    // --------------------------------------------------

    return await Mascota.findByPk(id);
};



// =======================================================
// ELIMINAR MASCOTA
// =======================================================

const deleteMascota = async (id) => {

    // --------------------------------------------------
    // VALIDACIÓN
    // --------------------------------------------------

    if (!id) {
        throw new Error("ID requerido para eliminar");
    }

    // --------------------------------------------------
    // DELETE
    // --------------------------------------------------

    const deleted = await Mascota.destroy({
        where: { id }
    });

    // --------------------------------------------------
    // RETORNO BOOLEANO (MEJOR PRÁCTICA)
    // --------------------------------------------------

    return deleted > 0;
};



// =======================================================
// CAMBIAR ESTADO DE MASCOTA
// =======================================================

const updateEstadoMascota = async (id, estado) => {

    // --------------------------------------------------
    // VALIDACIONES
    // --------------------------------------------------

    if (!id || !estado) {
        throw new Error("ID y estado requeridos");
    }

    // --------------------------------------------------
    // UPDATE PARCIAL
    // --------------------------------------------------

    const [updated] = await Mascota.update(
        { estado },
        { where: { id } }
    );

    // --------------------------------------------------
    // VALIDAR RESULTADO
    // --------------------------------------------------

    if (!updated) return null;

    // --------------------------------------------------
    // RETORNAR ACTUALIZADO
    // --------------------------------------------------

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
    updateEstadoMascota
};