// ------------------------------------------------------
// IMPORTAR REPOSITORY
// ------------------------------------------------------

// Importamos el repository de mascotas (acceso a DB)
const mascotaRepository = require("../repositories/mascota.repository");


// =======================================================
// OBTENER TODAS LAS MASCOTAS (CON FILTROS PRO)
// =======================================================

const getMascotas = async (query = {}) => {

    // --------------------------------------------------
    // CREAR OBJETO DE FILTROS
    // --------------------------------------------------

    const filtros = {};

    // --------------------------------------------------
    // FILTRO POR ESTADO
    // --------------------------------------------------

    if (query.estado) {
        filtros.estado = query.estado;
    }

    // --------------------------------------------------
    // FILTRO POR ENERGÍA
    // --------------------------------------------------

    if (query.energia) {
        filtros.energia = query.energia;
    }

    // --------------------------------------------------
    // FILTRO POR PORTE
    // --------------------------------------------------

    if (query.porte) {
        filtros.porte = query.porte;
    }

    // --------------------------------------------------
    // LLAMAR AL REPOSITORY
    // --------------------------------------------------

    return await mascotaRepository.getMascotas(filtros);
};


// =======================================================
// OBTENER MASCOTA POR ID
// =======================================================

const getMascotaById = async ({ id }) => {

    // Validamos que exista id
    if (!id) {

        const error = new Error("ID requerido");
        error.statusCode = 400;

        throw error;
    }

    // Buscamos mascota
    const mascota = await mascotaRepository.getMascotaById(id);

    // Si no existe
    if (!mascota) {

        const error = new Error("Mascota no encontrada");
        error.statusCode = 404;

        throw error;
    }

    return mascota;
};


// =======================================================
// CREAR MASCOTA
// =======================================================

const createMascota = async (data) => {

    // --------------------------------------------------
    // VALIDACIONES
    // --------------------------------------------------

    if (!data.nombre) {
        throw new Error("El nombre es obligatorio");
    }

    if (!data.edad) {
        throw new Error("La edad es obligatoria");
    }

    if (!data.descripcion || data.descripcion.length < 10) {
        throw new Error("La descripción debe tener al menos 10 caracteres");
    }

    // --------------------------------------------------
    // VALORES POR DEFECTO (🔥 PRO)
    // --------------------------------------------------

    if (!data.estado) {
        data.estado = "disponible";
    }

    // --------------------------------------------------
    // CREAR
    // --------------------------------------------------

    return await mascotaRepository.createMascota(data);
};


// =======================================================
// ACTUALIZAR MASCOTA
// =======================================================

const updateMascota = async ({ id, data }) => {

    if (!id) {

        const error = new Error("ID requerido para actualizar");
        error.statusCode = 400;

        throw error;
    }

    // Verificamos existencia
    const mascota = await mascotaRepository.getMascotaById(id);

    if (!mascota) {

        const error = new Error("Mascota no encontrada");
        error.statusCode = 404;

        throw error;
    }

    // Actualizamos
    return await mascotaRepository.updateMascota(id, data);
};


// =======================================================
// ELIMINAR MASCOTA
// =======================================================

const deleteMascota = async ({ id }) => {

    if (!id) {

        const error = new Error("ID requerido para eliminar");
        error.statusCode = 400;

        throw error;
    }

    // Eliminamos
    const deleted = await mascotaRepository.deleteMascota(id);

    if (!deleted) {

        const error = new Error("Mascota no encontrada");
        error.statusCode = 404;

        throw error;
    }

    return {
        message: "Mascota eliminada correctamente"
    };
};


// =======================================================
// MATCH DE MASCOTAS (🔥 NIVEL PRO)
// =======================================================

const getMatchMascotas = async (preferencias = {}) => {

    // Traemos mascotas disponibles
    const mascotas = await mascotaRepository.getMascotas({
        estado: "disponible"
    });

    // Calculamos compatibilidad
    const resultado = mascotas.map(mascota => {

        let score = 0;

        // Match energía
        if (preferencias.energia && mascota.energia === preferencias.energia) {
            score += 1;
        }

        // Match porte
        if (preferencias.porte && mascota.porte === preferencias.porte) {
            score += 1;
        }

        return {
            ...mascota.toJSON(), // 🔥 importante para evitar problemas de Sequelize
            match: score
        };
    });

    // Ordenamos de mayor a menor compatibilidad
    return resultado.sort((a, b) => b.match - a.match);
};


// =======================================================
// CAMBIAR ESTADO DE MASCOTA (🔥 PARA ADOPCIÓN)
// =======================================================

const cambiarEstadoMascota = async ({ id, estado }) => {

    if (!id || !estado) {

        const error = new Error("ID y estado son requeridos");
        error.statusCode = 400;

        throw error;
    }

    return await mascotaRepository.updateEstadoMascota(id, estado);
};


// ------------------------------------------------------
// EXPORTAR SERVICE
// ------------------------------------------------------

module.exports = {
    getMascotas,
    getMascotaById,
    createMascota,
    updateMascota,
    deleteMascota,
    getMatchMascotas,
    cambiarEstadoMascota // 🔥 clave para adopción
};