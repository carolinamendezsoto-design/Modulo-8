// ------------------------------------------------------
// IMPORTAR REPOSITORY
// ------------------------------------------------------

// Importamos el repository de mascotas
// Este se encarga de comunicarse con la base de datos
const mascotaRepository = require("../repositories/mascota.repository");


// =======================================================
// OBTENER TODAS LAS MASCOTAS (CON FILTROS PRO)
// =======================================================

const getMascotas = async (query) => {

    // --------------------------------------------------
    // CREAR OBJETO DE FILTROS
    // --------------------------------------------------

    // Creamos un objeto vacío donde guardaremos filtros válidos
    const filtros = {};

    // --------------------------------------------------
    // FILTRO POR ESTADO
    // --------------------------------------------------

    // Si viene ?estado=disponible
    if (query.estado) {
        filtros.estado = query.estado;
    }

    // --------------------------------------------------
    // FILTRO POR ENERGÍA
    // --------------------------------------------------

    // Si viene ?energia=Media
    if (query.energia) {
        filtros.energia = query.energia;
    }

    // --------------------------------------------------
    // FILTRO POR PORTE
    // --------------------------------------------------

    // Si viene ?porte=Pequeña
    if (query.porte) {
        filtros.porte = query.porte;
    }

    // --------------------------------------------------
    // LLAMAR AL REPOSITORY
    // --------------------------------------------------

    // Enviamos solo los filtros válidos
    return await mascotaRepository.getMascotas(filtros);
};


// =======================================================
// OBTENER MASCOTA POR ID
// =======================================================

const getMascotaById = async (params) => {

    // Extraemos el id desde params
    const { id } = params;

    // Validamos que exista id
    if (!id) {
        throw new Error("ID requerido");
    }

    // Llamamos al repository con ese id
    return await mascotaRepository.getMascotaById(id);
};


// =======================================================
// CREAR MASCOTA
// =======================================================

const createMascota = async (data) => {

    // --------------------------------------------------
    // VALIDACIONES
    // --------------------------------------------------

    // Validamos nombre
    if (!data.nombre) {
        throw new Error("El nombre es obligatorio");
    }

    // Validamos edad
    if (!data.edad) {
        throw new Error("La edad es obligatoria");
    }

    // Validamos descripción
    if (!data.descripcion || data.descripcion.length < 10) {
        throw new Error("La descripción debe tener al menos 10 caracteres");
    }

    // --------------------------------------------------
    // ENVIAR AL REPOSITORY
    // --------------------------------------------------

    return await mascotaRepository.createMascota(data);
};


// =======================================================
// ACTUALIZAR MASCOTA
// =======================================================

const updateMascota = async ({ id, data }) => {

    // Validamos que venga id
    if (!id) {
        throw new Error("ID requerido para actualizar");
    }

    // Llamamos al repository con id + datos
    return await mascotaRepository.updateMascota(id, data);
};


// =======================================================
// ELIMINAR MASCOTA
// =======================================================

const deleteMascota = async (params) => {

    // Extraemos el id desde params
    const { id } = params;

    // Validamos que exista id
    if (!id) {
        throw new Error("ID requerido para eliminar");
    }

    // Llamamos al repository
    return await mascotaRepository.deleteMascota(id);
};


// =======================================================
// MATCH DE MASCOTAS (🔥 NIVEL PRO)
// =======================================================

const getMatchMascotas = async (preferencias) => {

    // --------------------------------------------------
    // OBTENER TODAS LAS MASCOTAS
    // --------------------------------------------------

    // Traemos todas las mascotas disponibles
    const mascotas = await mascotaRepository.getMascotas({ estado: "disponible" });

    // --------------------------------------------------
    // CALCULAR COMPATIBILIDAD
    // --------------------------------------------------

    const resultado = mascotas.map(mascota => {

        // Inicializamos puntaje
        let score = 0;

        // --------------------------------------------------
        // MATCH POR ENERGÍA
        // --------------------------------------------------

        if (preferencias.energia && mascota.energia === preferencias.energia) {
            score += 1;
        }

        // --------------------------------------------------
        // MATCH POR PORTE
        // --------------------------------------------------

        if (preferencias.porte && mascota.porte === preferencias.porte) {
            score += 1;
        }

        // --------------------------------------------------
        // RETORNAR RESULTADO
        // --------------------------------------------------

        return {
            ...mascota,   // datos de la mascota
            match: score  // puntaje de compatibilidad
        };
    });

    // --------------------------------------------------
    // ORDENAR POR MEJOR MATCH
    // --------------------------------------------------

    return resultado.sort((a, b) => b.match - a.match);
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
    getMatchMascotas // 👈 NUEVO
};