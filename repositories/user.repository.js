// ------------------------------------------------------
// IMPORTAR MODELOS
// ------------------------------------------------------

// Importamos modelos desde index (🔥 mejor práctica centralizada)
const { User, Mascota, sequelize } = require("../models");


// =======================================================
// OBTENER TODOS LOS USUARIOS (CON FILTROS)
// =======================================================

// Esta función obtiene todos los usuarios con filtros opcionales
const findAllUsers = async (where = {}) => {

    // Usamos findAll de Sequelize
    return await User.findAll({

        // Aplicamos filtros dinámicos (ej: { email: "..." })
        where,

        // Excluimos password por seguridad (nunca devolver hashes)
        attributes: { exclude: ["password"] }

    });

};


// =======================================================
// 🔥 BUSCAR USUARIO POR EMAIL (CLAVE PARA LOGIN)
// =======================================================

// Esta función obtiene UN usuario por email (para autenticación)
const findUserByEmail = async (email) => {

    // Usamos findOne porque el email es único
    return await User.findOne({

        // Condición de búsqueda
        where: { email }

        // ⚠️ IMPORTANTE:
        // NO excluimos password aquí porque bcrypt lo necesita
    });

};


// =======================================================
// OBTENER USUARIOS CON MASCOTAS (RELACIÓN)
// =======================================================

// Trae usuarios incluyendo sus mascotas asociadas
const findUsersWithMascotas = async () => {

    return await User.findAll({

        // Incluimos relación con Mascota
        include: [
            {
                model: Mascota,           // modelo relacionado
                as: "mascotas",           // alias (debe coincidir con models/index.js)
                attributes: ["id", "nombre", "edad", "estado"] // campos visibles
            }
        ],

        // Excluimos password por seguridad
        attributes: { exclude: ["password"] }

    });

};


// =======================================================
// CREAR USUARIO
// =======================================================

// Crea un nuevo usuario en la base de datos
const createUser = async (data) => {

    // Sequelize crea registro directamente
    return await User.create(data);

};


// =======================================================
// BUSCAR USUARIO POR ID
// =======================================================

// Obtiene un usuario por su ID
const findUserById = async (id) => {

    return await User.findByPk(id, {

        // Ocultamos password
        attributes: { exclude: ["password"] }
    });

};


// =======================================================
// ACTUALIZAR USUARIO
// =======================================================

// Actualiza un usuario existente
const updateUser = async (usuario, data) => {

    // Sequelize permite actualizar la instancia directamente
    return await usuario.update(data);

};


// =======================================================
// ELIMINAR USUARIO
// =======================================================

// Elimina un usuario de la base de datos
const deleteUser = async (usuario) => {

    // destroy elimina el registro
    return await usuario.destroy();

};


// =======================================================
// CREAR USUARIO CON TRANSACCIÓN
// =======================================================

// Crea usuario usando transacción (nivel pro)
const createUserWithTransaction = async (data) => {

    // Iniciamos transacción
    const t = await sequelize.transaction();

    try {

        // Creamos usuario dentro de la transacción
        const usuario = await User.create(data, { transaction: t });

        // Log opcional (debug)
        console.log("Usuario creado:", usuario.email);

        // Confirmamos cambios
        await t.commit();

        // Retornamos usuario
        return usuario;

    } catch (error) {

        // Si falla algo → revertimos cambios
        await t.rollback();

        // Lanzamos error al controller
        throw error;
    }

};


// ------------------------------------------------------
// EXPORTAR FUNCIONES
// ------------------------------------------------------

// Exportamos todas las funciones del repository
module.exports = {
    findAllUsers,
    findUserByEmail,          // 🔥 CLAVE PARA LOGIN
    findUsersWithMascotas,
    createUser,
    findUserById,
    updateUser,
    deleteUser,
    createUserWithTransaction
};