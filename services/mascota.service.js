// ------------------------------------------------------
// IMPORTAR REPOSITORY
// ------------------------------------------------------

const mascotaRepository = require("../repositories/mascota.repository"); // capa DB


// ------------------------------------------------------
// GET MASCOTAS
// ------------------------------------------------------

const getMascotas = async (query = {}) => {

    if (typeof query !== "object") { // validación
        const error = new Error("Filtros inválidos");
        error.statusCode = 400;
        throw error;
    }

    const filtros = {}; // objeto filtros

    if (query.estado) filtros.estado = query.estado;
    if (query.energia) filtros.energia = query.energia;
    if (query.porte) filtros.porte = query.porte;
    if (query.userId) filtros.userId = query.userId; // AISLAMIENTO PARA EVITAR MEZCLA DE MASCOTAS SEGÚN PERFIL

    return await mascotaRepository.getMascotas(filtros); // DB
};


// ------------------------------------------------------
// GET POR ID
// ------------------------------------------------------

const getMascotaById = async ({ id }) => {

    if (!id) throw new Error("ID requerido");

    const mascota = await mascotaRepository.getMascotaById(id);

    if (!mascota) {
        const error = new Error("Mascota no encontrada");
        error.statusCode = 404;
        throw error;
    }

    return mascota;
};


// ------------------------------------------------------
// CREAR
// ------------------------------------------------------

const createMascota = async (data) => {

    if (!data.nombre) throw new Error("Nombre obligatorio");
    if (!data.raza) throw new Error("Raza obligatoria");
    if (!data.edad) throw new Error("Edad obligatoria");
    if (!data.descripcion) throw new Error("Descripción obligatoria");
    if (!data.userId) throw new Error("Usuario obligatorio");

    if (!data.estado) data.estado = "disponible";

    return await mascotaRepository.createMascota(data);
};


// ------------------------------------------------------
// UPDATE
// ------------------------------------------------------

const updateMascota = async ({ id, data }) => {

    if (!id) throw new Error("ID requerido");

    const mascota = await mascotaRepository.getMascotaById(id);

    if (!mascota) throw new Error("Mascota no encontrada");

    return await mascotaRepository.updateMascota(id, data);
};


// ------------------------------------------------------
// DELETE
// ------------------------------------------------------

const deleteMascota = async ({ id }) => {

    if (!id) throw new Error("ID requerido");

    const deleted = await mascotaRepository.deleteMascota(id);

    if (!deleted) throw new Error("Mascota no encontrada");

    return { message: "Mascota eliminada correctamente" };
};


// ------------------------------------------------------
// 🔥 UPDATE ESTADO (CLAVE)
// ------------------------------------------------------

const updateEstado = async (id, estado) => {

    if (!id || !estado) throw new Error("ID y estado requeridos");

    const mascota = await mascotaRepository.updateEstadoMascota(id, estado);

    if (!mascota) throw new Error("Mascota no encontrada");

    return mascota;
};


// ------------------------------------------------------
// EXPORT
// ------------------------------------------------------

module.exports = {
    getMascotas,
    getMascotaById,
    createMascota,
    updateMascota,
    deleteMascota,
    updateEstado
};