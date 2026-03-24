// ------------------------------------------------------
// IMPORTAR REPOSITORY
// ------------------------------------------------------

const mascotaRepository = require("../repositories/mascota.repository");


// =======================================================
// OBTENER TODAS LAS MASCOTAS
// =======================================================

const getMascotas = async (query = {}) => {

    if (typeof query !== "object") {
        const error = new Error("Los filtros deben ser un objeto");
        error.statusCode = 400;
        throw error;
    }

    const filtros = {};

    if (query.estado) filtros.estado = query.estado;
    if (query.energia) filtros.energia = query.energia;
    if (query.porte) filtros.porte = query.porte;

    return await mascotaRepository.getMascotas(filtros);
};


// =======================================================
// OBTENER POR ID
// =======================================================

const getMascotaById = async ({ id }) => {

    if (!id) {
        const error = new Error("ID requerido");
        error.statusCode = 400;
        throw error;
    }

    const mascota = await mascotaRepository.getMascotaById(id);

    if (!mascota) {
        const error = new Error("Mascota no encontrada");
        error.statusCode = 404;
        throw error;
    }

    return mascota;
};


// =======================================================
// CREAR
// =======================================================

const createMascota = async (data) => {

    if (!data || typeof data !== "object") {
        const error = new Error("Datos inválidos");
        error.statusCode = 400;
        throw error;
    }

    if (!data.nombre) throw new Error("El nombre es obligatorio");
    if (!data.raza) throw new Error("La raza es obligatoria");
    if (!data.edad) throw new Error("La edad es obligatoria");

    if (!data.descripcion || data.descripcion.length < 10) {
        throw new Error("La descripción debe tener al menos 10 caracteres");
    }

    if (!data.userId) throw new Error("El usuario es obligatorio");

    if (!data.estado) data.estado = "disponible";

    return await mascotaRepository.createMascota(data);
};


// =======================================================
// ACTUALIZAR
// =======================================================

const updateMascota = async ({ id, data }) => {

    if (!id) throw new Error("ID requerido");
    if (!data || typeof data !== "object") throw new Error("Datos inválidos");

    const mascota = await mascotaRepository.getMascotaById(id);

    if (!mascota) throw new Error("Mascota no encontrada");

    return await mascotaRepository.updateMascota(id, data);
};


// =======================================================
// ELIMINAR
// =======================================================

const deleteMascota = async ({ id }) => {

    if (!id) throw new Error("ID requerido");

    const deleted = await mascotaRepository.deleteMascota(id);

    if (!deleted) throw new Error("Mascota no encontrada");

    return { message: "Mascota eliminada correctamente" };
};


// =======================================================
// 🔥 FUNCIÓN CLAVE (LA QUE NECESITABAS)
// =======================================================

const updateEstado = async (id, estado) => {

    // Validación
    if (!id || !estado) {
        const error = new Error("ID y estado son requeridos");
        error.statusCode = 400;
        throw error;
    }

    // Llamamos al repository
    const mascota = await mascotaRepository.updateEstadoMascota(id, estado);

    // Validamos resultado
    if (!mascota) {
        const error = new Error("Mascota no encontrada");
        error.statusCode = 404;
        throw error;
    }

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
    updateEstado // ✅ SOLO ESTA
};