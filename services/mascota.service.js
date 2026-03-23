// ------------------------------------------------------
// IMPORTAR REPOSITORY
// ------------------------------------------------------

// Capa de acceso a datos (NO usamos Sequelize directo aquí)
// Esto mantiene el service limpio y desacoplado de la DB
const mascotaRepository = require("../repositories/mascota.repository");


// =======================================================
// OBTENER TODAS LAS MASCOTAS (CON FILTROS)
// =======================================================

const getMascotas = async (query = {}) => {

    // --------------------------------------------------
    // VALIDACIÓN DE QUERY
    // --------------------------------------------------

    // Validamos que query sea un objeto válido
    if (typeof query !== "object") {
        const error = new Error("Los filtros deben ser un objeto");
        error.statusCode = 400;
        throw error;
    }

    // --------------------------------------------------
    // ARMAR FILTROS LIMPIOS
    // --------------------------------------------------

    const filtros = {};

    // Solo agregamos propiedades válidas (evita basura o SQL injection indirecto)
    if (query.estado) filtros.estado = query.estado;
    if (query.energia) filtros.energia = query.energia;
    if (query.porte) filtros.porte = query.porte;

    // --------------------------------------------------
    // LLAMADA AL REPOSITORY
    // --------------------------------------------------

    const mascotas = await mascotaRepository.getMascotas(filtros);

    // Retornamos siempre array (aunque esté vacío)
    return mascotas;
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

    if (!data || typeof data !== "object") {
        const error = new Error("Datos inválidos");
        error.statusCode = 400;
        throw error;
    }

    // Validaciones obligatorias
    if (!data.nombre) {
        const error = new Error("El nombre es obligatorio");
        error.statusCode = 400;
        throw error;
    }

    if (!data.edad) {
        const error = new Error("La edad es obligatoria");
        error.statusCode = 400;
        throw error;
    }

    if (!data.descripcion || data.descripcion.length < 10) {
        const error = new Error("La descripción debe tener al menos 10 caracteres");
        error.statusCode = 400;
        throw error;
    }

    if (!data.userId) {
        const error = new Error("El usuario es obligatorio");
        error.statusCode = 400;
        throw error;
    }

    // --------------------------------------------------
    // VALORES POR DEFECTO (REGLA DE NEGOCIO)
    // --------------------------------------------------

    if (!data.estado) {
        data.estado = "disponible"; // regla de negocio
    }

    // --------------------------------------------------
    // CREACIÓN
    // --------------------------------------------------

    const nuevaMascota = await mascotaRepository.createMascota(data);

    return nuevaMascota;
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

    if (!data || typeof data !== "object") {
        const error = new Error("Datos inválidos para actualizar");
        error.statusCode = 400;
        throw error;
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

    const mascotaActualizada = await mascotaRepository.updateMascota(id, data);

    return mascotaActualizada;
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

    // Buena práctica: retornar mensaje claro
    return {
        message: "Mascota eliminada correctamente"
    };
};



// =======================================================
// MATCH DE MASCOTAS (🔥 DIFERENCIADOR PRO)
// =======================================================

const getMatchMascotas = async (preferencias = {}) => {

    // --------------------------------------------------
    // VALIDACIÓN
    // --------------------------------------------------

    if (typeof preferencias !== "object") {
        const error = new Error("Preferencias inválidas");
        error.statusCode = 400;
        throw error;
    }

    // --------------------------------------------------
    // TRAER MASCOTAS DISPONIBLES
    // --------------------------------------------------

    const mascotas = await mascotaRepository.getMascotas({
        estado: "disponible"
    });

    // --------------------------------------------------
    // CALCULAR MATCH (ALGORITMO SIMPLE)
    // --------------------------------------------------

    const resultado = mascotas.map(mascota => {

        let score = 0;

        // Comparación por energía
        if (preferencias.energia && mascota.energia === preferencias.energia) {
            score++;
        }

        // Comparación por porte
        if (preferencias.porte && mascota.porte === preferencias.porte) {
            score++;
        }

        return {
            ...mascota.toJSON(), // importante para evitar problemas Sequelize
            match: score
        };
    });

    // --------------------------------------------------
    // ORDENAR RESULTADOS (MEJOR MATCH PRIMERO)
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