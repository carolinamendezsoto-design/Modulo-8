// ------------------------------------------------------
// IMPORTAR MODELOS
// ------------------------------------------------------

// Importamos modelos desde index (mejor práctica centralizada)
const { User, Mascota, sequelize } = require("../models");


// =======================================================
// OBTENER TODOS LOS USUARIOS (CON FILTROS)
// =======================================================

// Obtiene todos los usuarios con filtros opcionales
const findAllUsers = async (where = {}) => {

    return await User.findAll({

        // Aplicamos filtros dinámicos
        where,

        // Excluimos password por seguridad
        attributes: { exclude: ["password"] }

    });

};


// =======================================================
// 🔥 BUSCAR USUARIO POR EMAIL (FIX CRÍTICO)
// =======================================================

// Busca un usuario por email (usado en login)
const findUserByEmail = async (email) => {

    // --------------------------------------------------
    // NORMALIZAR EMAIL (🔥 CLAVE)
    // --------------------------------------------------

    // Aseguramos consistencia total
    const emailNormalizado = email?.trim().toLowerCase();

    // DEBUG (puedes quitar después)
    console.log("🔎 Buscando usuario con email:", emailNormalizado);

    // --------------------------------------------------
    // CONSULTA
    // --------------------------------------------------

    return await User.findOne({

        // Buscamos por email normalizado
        where: { email: emailNormalizado }

        // ⚠️ IMPORTANTE:
        // No excluimos password → bcrypt lo necesita
    });

};


// =======================================================
// OBTENER USUARIOS CON MASCOTAS
// =======================================================

const findUsersWithMascotas = async () => {

    return await User.findAll({

        include: [
            {
                model: Mascota,
                as: "mascotas",
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

        console.log("Usuario creado:", usuario.email);

        await t.commit();

        return usuario;

    } catch (error) {

        await t.rollback();

        throw error;
    }

};


// ------------------------------------------------------
// EXPORTAR FUNCIONES
// ------------------------------------------------------

module.exports = {
    findAllUsers,
    findUserByEmail,
    findUsersWithMascotas,
    createUser,
    findUserById,
    updateUser,
    deleteUser,
    createUserWithTransaction
};