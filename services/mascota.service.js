// ------------------------------------------------------
// IMPORTAR REPOSITORY
// ------------------------------------------------------

// Capa de acceso a datos (NO usamos Sequelize directo aquí)
const mascotaRepository = require("../repositories/mascota.repository");


// =======================================================
// OBTENER TODAS LAS MASCOTAS (CON FILTROS)
// =======================================================

const getMascotas = async (query = {}) => {

    // --------------------------------------------------
    // VALIDACIÓN DE QUERY
    // --------------------------------------------------

    if (typeof query !== "object") {
        throw new Error("Los filtros deben ser un objeto");
    }

    // --------------------------------------------------
    // ARMAR FILTROS LIMPIOS
    // --------------------------------------------------

    const filtros = {};

    // Solo agregamos si existen (evita basura en query)
    if (query.estado) filtros.estado = query.estado;
    if (query.energia) filtros.energia = query.energia;
    if (query.porte) filtros.porte = query.porte;

    // --------------------------------------------------
    // LLAMADA AL REPOSITORY
    // --------------------------------------------------

    return await mascotaRepository.getMascotas(filtros);
};



// =======================================================
// OBTENER MASCOTA POR ID
// =======================================================

const getMascotaById = async ({ id }) => {

    // --------------------------------------------------
    // VALIDACIÓN
    // --------------------------------------------------

    if (!id) {
        const error = new Error("ID requerido");
        error.statusCode = 400;
        throw error;
    }

    // --------------------------------------------------
    // CONSULTA
    // --------------------------------------------------

    const mascota = await mascotaRepository.getMascotaById(id);

    // --------------------------------------------------
    // VALIDAR EXISTENCIA
    // --------------------------------------------------

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
    // VALIDACIONES DE NEGOCIO
    // --------------------------------------------------

    if (!data) {
        throw new Error("Datos requeridos");
    }

    if (!data.nombre) {
        throw new Error("El nombre es obligatorio");
    }

    if (!data.edad) {
        throw new Error("La edad es obligatoria");
    }

    if (!data.descripcion || data.descripcion.length < 10) {
        throw new Error("La descripción debe tener al menos 10 caracteres");
    }

    if (!data.userId) {
        throw new Error("El usuario es obligatorio");
    }

    // --------------------------------------------------
    // VALORES POR DEFECTO (REGLA DE NEGOCIO)
    // --------------------------------------------------

    if (!data.estado) {
        data.estado = "disponible";
    }

    // --------------------------------------------------
    // CREACIÓN
    // --------------------------------------------------

    return await mascotaRepository.createMascota(data);
};



// =======================================================
// ACTUALIZAR MASCOTA
// =======================================================

const updateMascota = async ({ id, data }) => {

    // --------------------------------------------------
    // VALIDACIONES
    // --------------------------------------------------

    if (!id) {
        const error = new Error("ID requerido para actualizar");
        error.statusCode = 400;
        throw error;
    }

    if (!data) {
        throw new Error("Datos requeridos para actualizar");
    }

    // --------------------------------------------------
    // VERIFICAR EXISTENCIA
    // --------------------------------------------------

    const mascota = await mascotaRepository.getMascotaById(id);

    if (!mascota) {
        const error = new Error("Mascota no encontrada");
        error.statusCode = 404;
        throw error;
    }

    // --------------------------------------------------
    // ACTUALIZACIÓN
    // --------------------------------------------------

    return await mascotaRepository.updateMascota(id, data);
};



// =======================================================
// ELIMINAR MASCOTA
// =======================================================

const deleteMascota = async ({ id }) => {

    // --------------------------------------------------
    // VALIDACIÓN
    // --------------------------------------------------

    if (!id) {
        const error = new Error("ID requerido para eliminar");
        error.statusCode = 400;
        throw error;
    }

    // --------------------------------------------------
    // ELIMINACIÓN
    // --------------------------------------------------

    const deleted = await mascotaRepository.deleteMascota(id);

    // --------------------------------------------------
    // VALIDAR RESULTADO
    // --------------------------------------------------

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
// MATCH DE MASCOTAS (🔥 DIFERENCIADOR)
// =======================================================

const getMatchMascotas = async (preferencias = {}) => {

    // --------------------------------------------------
    // VALIDACIÓN
    // --------------------------------------------------

    if (typeof preferencias !== "object") {
        throw new Error("Preferencias inválidas");
    }

    // --------------------------------------------------
    // TRAER MASCOTAS DISPONIBLES
    // --------------------------------------------------

    const mascotas = await mascotaRepository.getMascotas({
        estado: "disponible"
    });

    // --------------------------------------------------
    // CALCULAR MATCH
    // --------------------------------------------------

    const resultado = mascotas.map(mascota => {

        let score = 0;

        if (preferencias.energia && mascota.energia === preferencias.energia) {
            score++;
        }

        if (preferencias.porte && mascota.porte === preferencias.porte) {
            score++;
        }

        return {
            ...mascota.toJSON(), // evitar problemas Sequelize
            match: score
        };
    });

    // --------------------------------------------------
    // ORDENAR RESULTADOS
    // --------------------------------------------------

    return resultado.sort((a, b) => b.match - a.match);
};



// =======================================================
// CAMBIAR ESTADO DE MASCOTA
// =======================================================

const cambiarEstadoMascota = async ({ id, estado }) => {

    // --------------------------------------------------
    // VALIDACIONES
    // --------------------------------------------------

    if (!id || !estado) {
        const error = new Error("ID y estado son requeridos");
        error.statusCode = 400;
        throw error;
    }

    // --------------------------------------------------
    // ACTUALIZACIÓN
    // --------------------------------------------------

    const mascota = await mascotaRepository.updateEstadoMascota(id, estado);

    if (!mascota) {
        const error = new Error("Mascota no encontrada");
        error.statusCode = 404;
        throw error;
    }

    return mascota;
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
    cambiarEstadoMascota
};