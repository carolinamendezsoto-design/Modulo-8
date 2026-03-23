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
        const error = new Error("Los filtros deben ser un objeto"); // mensaje claro
        error.statusCode = 400; // código HTTP
        throw error; // lanzamos error
    }

    // --------------------------------------------------
    // ARMAR FILTROS LIMPIOS
    // --------------------------------------------------

    const filtros = {}; // objeto vacío donde construiremos filtros válidos

    // Solo agregamos propiedades válidas (evita basura o SQL injection indirecto)
    if (query.estado) filtros.estado = query.estado; // filtramos por estado
    if (query.energia) filtros.energia = query.energia; // filtramos por energía
    if (query.porte) filtros.porte = query.porte; // filtramos por porte

    // --------------------------------------------------
    // LLAMADA AL REPOSITORY
    // --------------------------------------------------

    const mascotas = await mascotaRepository.getMascotas(filtros); // consulta DB

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
        const error = new Error("ID requerido"); // mensaje claro
        error.statusCode = 400; // error cliente
        throw error;
    }

    // --------------------------------------------------
    // CONSULTA
    // --------------------------------------------------

    const mascota = await mascotaRepository.getMascotaById(id); // buscamos por id

    // --------------------------------------------------
    // VALIDAR EXISTENCIA
    // --------------------------------------------------

    if (!mascota) {
        const error = new Error("Mascota no encontrada"); // no existe
        error.statusCode = 404; // not found
        throw error;
    }

    return mascota; // retornamos mascota encontrada
};



// =======================================================
// CREAR MASCOTA
// =======================================================

const createMascota = async (data) => {

    // --------------------------------------------------
    // VALIDACIONES DE NEGOCIO
    // --------------------------------------------------

    // Validamos que data exista y sea objeto
    if (!data || typeof data !== "object") {
        const error = new Error("Datos inválidos");
        error.statusCode = 400;
        throw error;
    }

    // --------------------------------------------------
    // CAMPOS OBLIGATORIOS
    // --------------------------------------------------

    if (!data.nombre) {
        const error = new Error("El nombre es obligatorio");
        error.statusCode = 400;
        throw error;
    }

    // 🔥 NUEVO → VALIDAMOS RAZA (ANTES NO EXISTÍA)
    if (!data.raza) {
        const error = new Error("La raza es obligatoria");
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
        data.estado = "disponible"; // por defecto siempre disponible
    }

    // --------------------------------------------------
    // CREACIÓN
    // --------------------------------------------------

    const nuevaMascota = await mascotaRepository.createMascota(data); // guardamos en DB

    return nuevaMascota; // devolvemos resultado
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

    const mascota = await mascotaRepository.getMascotaById(id); // buscamos primero

    if (!mascota) {
        const error = new Error("Mascota no encontrada");
        error.statusCode = 404;
        throw error;
    }

    // --------------------------------------------------
    // ACTUALIZACIÓN
    // --------------------------------------------------

    const mascotaActualizada = await mascotaRepository.updateMascota(id, data); // actualizamos

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

    const deleted = await mascotaRepository.deleteMascota(id); // eliminamos

    // --------------------------------------------------
    // VALIDAR RESULTADO
    // --------------------------------------------------

    if (!deleted) {
        const error = new Error("Mascota no encontrada");
        error.statusCode = 404;
        throw error;
    }

    // Retorno claro (buena práctica)
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
    // CALCULAR MATCH
    // --------------------------------------------------

    const resultado = mascotas.map(mascota => {

        let score = 0; // puntaje inicial

        // energía coincide
        if (preferencias.energia && mascota.energia === preferencias.energia) {
            score++;
        }

        // porte coincide
        if (preferencias.porte && mascota.porte === preferencias.porte) {
            score++;
        }

        return {
            ...mascota.toJSON(), // convertimos a JSON plano
            match: score // agregamos score
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