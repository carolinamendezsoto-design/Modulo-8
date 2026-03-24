// ------------------------------------------------------
// IMPORTAR MODELOS
// ------------------------------------------------------

// Importamos modelos desde index.js (centralización)
const { User, Mascota, sequelize } = require("../models");


// ------------------------------------------------------
// OBTENER TODOS LOS USUARIOS
// ------------------------------------------------------

const findAllUsers = async (where = {}) => {

    // Buscamos todos los usuarios con filtros opcionales
    return await User.findAll({

        where, // filtros dinámicos

        // 🔒 Nunca devolver password
        attributes: { exclude: ["password"] }

    });

};


// ------------------------------------------------------
// BUSCAR USUARIO POR EMAIL
// ------------------------------------------------------

const findUserByEmail = async (email) => {

    // --------------------------------------------------
    // NORMALIZAR EMAIL
    // --------------------------------------------------

    // Limpiamos espacios y convertimos a minúscula
    const emailNormalizado = email?.trim().toLowerCase();

    // Log de debug
    console.log("🔎 Buscando usuario:", emailNormalizado);


    // --------------------------------------------------
    // CONSULTA
    // --------------------------------------------------

    return await User.findOne({

        where: { email: emailNormalizado }

        // ⚠️ IMPORTANTE:
        // NO excluimos password porque se usa en login
    });

};


// ------------------------------------------------------
// CREAR USUARIO
// ------------------------------------------------------

const createUser = async (data) => {

    // 🔥 IMPORTANTE:
    // Aquí NO se encripta password
    // El password YA viene encriptado desde auth.service

    return await User.create(data);

};


// ------------------------------------------------------
// BUSCAR USUARIO POR ID
// ------------------------------------------------------

const findUserById = async (id) => {

    return await User.findByPk(id, {

        // 🔒 No devolvemos password
        attributes: { exclude: ["password"] }

    });

};


// ------------------------------------------------------
// ACTUALIZAR USUARIO
// ------------------------------------------------------

const updateUser = async (usuario, data) => {

    // Actualizamos datos del usuario
    return await usuario.update(data);

};


// ------------------------------------------------------
// ELIMINAR USUARIO
// ------------------------------------------------------

const deleteUser = async (usuario) => {

    // Eliminamos usuario
    return await usuario.destroy();

};


// ------------------------------------------------------
// EXPORTAR FUNCIONES
// ------------------------------------------------------

module.exports = {
    findAllUsers,
    findUserByEmail,
    createUser,
    findUserById,
    updateUser,
    deleteUser
};