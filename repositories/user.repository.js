// ------------------------------------------------------
// IMPORTAR MODELOS
// ------------------------------------------------------

// Importamos desde index (MEJOR PRÁCTICA)
const { User, Mascota, sequelize } = require("../models");


// =======================================================
// OBTENER TODOS LOS USUARIOS (CON FILTROS)
// =======================================================

const findAllUsers = async (where = {}) => {

    return await User.findAll({

        // Aplicamos filtros dinámicos
        where,

        // Excluimos password por seguridad
        attributes: { exclude: ["password"] }

    });

};


// =======================================================
// OBTENER USUARIOS CON MASCOTAS (RELACIÓN)
// =======================================================

const findUsersWithMascotas = async () => {

    return await User.findAll({

        include: [
            {
                model: Mascota,
                as: "mascotas", // ⚠️ debe coincidir con models/index.js
                attributes: ["id", "nombre", "edad", "estado"]
            }
        ],

        attributes: { exclude: ["password"] }

    });

};


// =======================================================
// CREAR USUARIO
// =======================================================

const createUser = async (data) => {

    return await User.create(data);

};


// =======================================================
// BUSCAR USUARIO POR ID
// =======================================================

const findUserById = async (id) => {

    return await User.findByPk(id, {
        attributes: { exclude: ["password"] }
    });

};


// =======================================================
// ACTUALIZAR USUARIO
// =======================================================

const updateUser = async (usuario, data) => {

    // Sequelize permite actualizar directamente la instancia
    return await usuario.update(data);

};


// =======================================================
// ELIMINAR USUARIO
// =======================================================

const deleteUser = async (usuario) => {

    return await usuario.destroy();

};


// =======================================================
// CREAR USUARIO CON TRANSACCIÓN
// =======================================================

const createUserWithTransaction = async (data) => {

    const t = await sequelize.transaction();

    try {

        const usuario = await User.create(data, { transaction: t });

        // Simulación de log
        console.log("Usuario creado:", usuario.email);

        await t.commit();

        return usuario;

    } catch (error) {

        await t.rollback();

        throw error;
    }

};


// ------------------------------------------------------
// EXPORTAR
// ------------------------------------------------------

module.exports = {
    findAllUsers,
    findUsersWithMascotas,
    createUser,
    findUserById,
    updateUser,
    deleteUser,
    createUserWithTransaction
};