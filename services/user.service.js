// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

// Librería para encriptar contraseñas
const bcrypt = require("bcryptjs");

// Repository para acceso a base de datos
const userRepository = require("../repositories/user.repository");


// =======================================================
// OBTENER USUARIOS (CON FILTROS)
// =======================================================

const getUsers = async (query = {}) => {

    // Validamos que query sea objeto
    if (typeof query !== "object") {
        const error = new Error("Filtros inválidos");
        error.statusCode = 400;
        throw error;
    }

    // Creamos objeto where limpio
    const where = {};

    // Filtro por nombre
    if (query.nombre) {
        where.nombre = query.nombre;
    }

    // Filtro por rol
    if (query.rol) {
        where.rol = query.rol;
    }

    // Llamamos repository
    const users = await userRepository.findAllUsers(where);

    return users;
};


// =======================================================
// OBTENER USUARIOS CON MASCOTAS
// =======================================================

const getUsersWithMascotas = async () => {

    // Llamada directa al repository
    return await userRepository.findUsersWithMascotas();
};


// =======================================================
// CREAR USUARIO
// =======================================================

const createUser = async (data) => {

    // --------------------------------------------------
    // VALIDACIONES
    // --------------------------------------------------

    if (!data || typeof data !== "object") {
        const error = new Error("Datos inválidos");
        error.statusCode = 400;
        throw error;
    }

    if (!data.nombre || !data.email || !data.password) {
        const error = new Error("Nombre, email y password son obligatorios");
        error.statusCode = 400;
        throw error;
    }

    // --------------------------------------------------
    // VALIDAR ROL
    // --------------------------------------------------

    const rolesValidos = ["admin", "adoptante", "rescatista"];

    // Default
    if (!data.rol) {
        data.rol = "adoptante";
    }

    if (!rolesValidos.includes(data.rol)) {
        const error = new Error("Rol inválido");
        error.statusCode = 400;
        throw error;
    }

    // --------------------------------------------------
    // ENCRIPTAR PASSWORD
    // --------------------------------------------------

    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;

    // --------------------------------------------------
    // CREAR USUARIO
    // --------------------------------------------------

    const usuario = await userRepository.createUser(data);

    // Retornamos sin password (seguridad)
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

    if (!data || typeof data !== "object") {
        const error = new Error("Datos inválidos");
        error.statusCode = 400;
        throw error;
    }

    const usuario = await userRepository.findUserById(id);

    if (!usuario) {
        const error = new Error("Usuario no encontrado");
        error.statusCode = 404;
        throw error;
    }

    // Encriptar password si viene
    if (data.password) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        data.password = hashedPassword;
    }

    // Validar rol
    if (data.rol) {
        const rolesValidos = ["admin", "adoptante", "rescatista"];

        if (!rolesValidos.includes(data.rol)) {
            const error = new Error("Rol inválido");
            error.statusCode = 400;
            throw error;
        }
    }

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

    if (!data || typeof data !== "object") {
        const error = new Error("Datos inválidos");
        error.statusCode = 400;
        throw error;
    }

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


// EXPORT
module.exports = {
    getUsers,
    getUsersWithMascotas,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    createUserTransaction
};