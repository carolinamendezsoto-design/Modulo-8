// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

// Librería para encriptar contraseñas
const bcrypt = require("bcryptjs");

// Repository (acceso a DB)
const userRepository = require("../repositories/user.repository");


// =======================================================
// OBTENER USUARIOS (CON FILTROS)
// =======================================================

const getUsers = async (query = {}) => {

    // Objeto de filtros
    const where = {};

    // Filtro por nombre
    if (query.nombre) {
        where.nombre = query.nombre;
    }

    // Filtro por rol
    if (query.rol) {
        where.rol = query.rol;
    }

    // Consultamos DB
    return await userRepository.findAllUsers(where);
};


// =======================================================
// OBTENER USUARIOS CON MASCOTAS (🔥 CORREGIDO)
// =======================================================

const getUsersWithMascotas = async () => {

    // Llamamos al repository correcto
    return await userRepository.findUsersWithMascotas();
};


// =======================================================
// CREAR USUARIO
// =======================================================

const createUser = async (data) => {

    // --------------------------------------------------
    // VALIDACIÓN
    // --------------------------------------------------

    if (!data.nombre || !data.email || !data.password) {

        const error = new Error("Nombre, email y password son obligatorios");
        error.statusCode = 400;

        throw error;
    }

    // --------------------------------------------------
    // VALIDAR ROL
    // --------------------------------------------------

    const rolesValidos = ["admin", "adoptante", "rescatista"];

    // Si no viene rol → default
    if (!data.rol) {
        data.rol = "adoptante";
    }

    if (!rolesValidos.includes(data.rol)) {

        const error = new Error("Rol inválido");
        error.statusCode = 400;

        throw error;
    }

    // --------------------------------------------------
    // ENCRIPTAR PASSWORD 🔐
    // --------------------------------------------------

    const hashedPassword = await bcrypt.hash(data.password, 10);

    data.password = hashedPassword;

    // --------------------------------------------------
    // CREAR USUARIO
    // --------------------------------------------------

    const usuario = await userRepository.createUser(data);

    // Retornamos objeto limpio (SIN password)
    return {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        telefono: usuario.telefono,
        rol: usuario.rol
    };
};


// =======================================================
// OBTENER USUARIO POR ID
// =======================================================

const getUserById = async ({ id }) => {

    if (!id) {

        const error = new Error("ID requerido");
        error.statusCode = 400;

        throw error;
    }

    const usuario = await userRepository.findUserById(id);

    if (!usuario) {

        const error = new Error("Usuario no encontrado");
        error.statusCode = 404;

        throw error;
    }

    return usuario;
};


// =======================================================
// ACTUALIZAR USUARIO
// =======================================================

const updateUser = async ({ id, data }) => {

    if (!id) {

        const error = new Error("ID requerido");
        error.statusCode = 400;

        throw error;
    }

    const usuario = await userRepository.findUserById(id);

    if (!usuario) {

        const error = new Error("Usuario no encontrado");
        error.statusCode = 404;

        throw error;
    }

    // --------------------------------------------------
    // ENCRIPTAR PASSWORD SI VIENE
    // --------------------------------------------------

    if (data.password) {

        const hashedPassword = await bcrypt.hash(data.password, 10);

        data.password = hashedPassword;
    }

    // --------------------------------------------------
    // VALIDAR ROL
    // --------------------------------------------------

    if (data.rol) {

        const rolesValidos = ["admin", "adoptante", "rescatista"];

        if (!rolesValidos.includes(data.rol)) {

            const error = new Error("Rol inválido");
            error.statusCode = 400;

            throw error;
        }
    }

    // Actualizamos
    await userRepository.updateUser(usuario, data);

    return {
        message: "Usuario actualizado correctamente"
    };
};


// =======================================================
// ELIMINAR USUARIO
// =======================================================

const deleteUser = async ({ id }) => {

    if (!id) {

        const error = new Error("ID requerido");
        error.statusCode = 400;

        throw error;
    }

    const usuario = await userRepository.findUserById(id);

    if (!usuario) {

        const error = new Error("Usuario no encontrado");
        error.statusCode = 404;

        throw error;
    }

    await userRepository.deleteUser(usuario);

    return {
        message: "Usuario eliminado correctamente"
    };
};


// =======================================================
// CREAR USUARIO CON TRANSACCIÓN
// =======================================================

const createUserTransaction = async (data) => {

    // Encriptamos password si viene
    if (data.password) {

        const hashedPassword = await bcrypt.hash(data.password, 10);

        data.password = hashedPassword;
    }

    const usuario = await userRepository.createUserWithTransaction(data);

    return {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        telefono: usuario.telefono,
        rol: usuario.rol
    };
};


// ------------------------------------------------------
// EXPORTAR
// ------------------------------------------------------

module.exports = {
    getUsers,
    getUsersWithMascotas, // 🔥 corregido
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    createUserTransaction
};