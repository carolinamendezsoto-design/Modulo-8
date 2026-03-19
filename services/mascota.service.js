// ------------------------------------------------------
// IMPORTAR REPOSITORY
// ------------------------------------------------------

// Importamos el repository de mascotas.
// El repository es el encargado de comunicarse con la base de datos.
const mascotaRepository = require("../repositories/mascota.repository");


// =======================================================
// OBTENER TODAS LAS MASCOTAS
// =======================================================

// Función que obtiene todas las mascotas
// Recibe query params (filtros opcionales desde el controller)
const getMascotas = async (query) => {

    // Llamamos al repository y le pasamos los filtros
    return await mascotaRepository.getMascotas(query);

};


// =======================================================
// OBTENER MASCOTA POR ID
// =======================================================

// Función que obtiene una mascota específica por su ID
const getMascotaById = async (params) => {

    // Extraemos el id desde los parámetros
    const { id } = params;

    // Llamamos al repository con ese id
    return await mascotaRepository.getMascotaById(id);

};


// =======================================================
// CREAR MASCOTA
// =======================================================

// Función que crea una nueva mascota
const createMascota = async (data) => {

    // Enviamos los datos al repository para guardarlos en la base de datos
    return await mascotaRepository.createMascota(data);

};


// =======================================================
// ACTUALIZAR MASCOTA
// =======================================================

// Función que actualiza una mascota existente
const updateMascota = async ({ id, data }) => {

    // Llamamos al repository enviando:
    // - id de la mascota
    // - datos nuevos a actualizar
    return await mascotaRepository.updateMascota(id, data);

};


// =======================================================
// ELIMINAR MASCOTA
// =======================================================

// Función que elimina una mascota
const deleteMascota = async (params) => {

    // Extraemos el id desde params
    const { id } = params;

    // Llamamos al repository para eliminarla
    return await mascotaRepository.deleteMascota(id);

};


// ------------------------------------------------------
// EXPORTAR SERVICE
// ------------------------------------------------------

// Exportamos todas las funciones para usarlas en el controller
module.exports = {
    getMascotas,
    getMascotaById,
    createMascota,
    updateMascota,
    deleteMascota
};