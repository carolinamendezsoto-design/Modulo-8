// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

// Importamos bcrypt para encriptar contraseñas
const bcrypt = require("bcryptjs");

// Importamos el repository (acceso a DB)
const userRepository = require("../repositories/user.repository");


// =======================================================
// OBTENER USUARIOS (CON FILTROS)
// =======================================================

exports.getUsers = async (query) => {

    // Creamos objeto de filtros
    const where = {};

    // Si viene nombre → filtramos
    if (query?.nombre) {
        where.nombre = query.nombre;
    }

    // Si viene rol → filtramos (🔥 NUEVO)
    if (query?.rol) {
        where.rol = query.rol;
    }

    // Consultamos DB
    const usuarios = await userRepository.findAllUsers(where);

    // Retornamos SOLO datos (controller arma respuesta)
    return usuarios;
};


// =======================================================
// OBTENER USUARIOS CON POSTS (OPCIONAL)
// =======================================================

exports.getUsersWithPosts = async () => {

    const usuarios = await userRepository.findUsersWithPosts();

    return {
        status: "success",
        message: "Usuarios con posts obtenidos correctamente",
        data: usuarios
    };
};


// =======================================================
// CREAR USUARIO
// =======================================================

exports.createUser = async (data) => {

    // --------------------------------------------------
    // VALIDACIÓN
    // --------------------------------------------------

    // Validamos campos obligatorios
    if (!data.nombre || !data.email || !data.password) {

        const error = new Error("Nombre, email y password son obligatorios");
        error.statusCode = 400;
        throw error;
    }

    // --------------------------------------------------
    // VALIDAR ROL (🔥 IMPORTANTE)
    // --------------------------------------------------

    const rolesValidos = ["admin", "adoptante", "rescatista"];

    // Si no viene rol → asignamos adoptante
    if (!data.rol) {
        data.rol = "adoptante";
    }

    // Si rol no es válido → error
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

    // --------------------------------------------------
    // RESPUESTA SEGURA
    // --------------------------------------------------

    return {
        status: "success",
        message: "Usuario creado correctamente",
        data: {
            id: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email,
            telefono: usuario.telefono, // 🔥 NUEVO
            rol: usuario.rol            // 🔥 NUEVO
        }
    };
};


// =======================================================
// OBTENER USUARIO POR ID
// =======================================================

exports.getUserById = async ({ id }) => {

    const usuario = await userRepository.findUserById(id);

    if (!usuario) {
        const error = new Error("Usuario no encontrado");
        error.statusCode = 404;
        throw error;
    }

    // 🔥 ahora devolvemos solo el objeto limpio
    return usuario;
};


// =======================================================
// ACTUALIZAR USUARIO
// =======================================================

exports.updateUser = async ({ id, data }) => {

    const usuario = await userRepository.findUserById(id);

    if (!usuario) {
        const error = new Error("Usuario no encontrado");
        error.statusCode = 404;
        throw error;
    }

    // --------------------------------------------------
    // SI VIENE PASSWORD → ENCRIPTAR
    // --------------------------------------------------

    if (data.password) {

        const hashedPassword = await bcrypt.hash(data.password, 10);

        data.password = hashedPassword;
    }

    // --------------------------------------------------
    // VALIDAR ROL (🔥 IMPORTANTE)
    // --------------------------------------------------

    if (data.rol) {

        const rolesValidos = ["admin", "adoptante", "rescatista"];

        if (!rolesValidos.includes(data.rol)) {
            const error = new Error("Rol inválido");
            error.statusCode = 400;
            throw error;
        }
    }

    // Actualizamos en DB
    await userRepository.updateUser(usuario, data);

    return {
        status: "success",
        message: "Usuario actualizado correctamente"
    };
};


// =======================================================
// ELIMINAR USUARIO
// =======================================================

exports.deleteUser = async ({ id }) => {

    const usuario = await userRepository.findUserById(id);

    if (!usuario) {
        const error = new Error("Usuario no encontrado");
        error.statusCode = 404;
        throw error;
    }

    await userRepository.deleteUser(usuario);

    return {
        status: "success",
        message: "Usuario eliminado correctamente"
    };
};


// =======================================================
// CREAR USUARIO CON TRANSACCIÓN
// =======================================================

exports.createUserTransaction = async (data) => {

    // Encriptamos password si viene
    if (data.password) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        data.password = hashedPassword;
    }

    const usuario = await userRepository.createUserWithTransaction(data);

    return {
        status: "success",
        message: "Usuario creado con transacción correctamente",
        data: {
            id: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email,
            telefono: usuario.telefono, // 🔥 NUEVO
            rol: usuario.rol            // 🔥 NUEVO
        }
    };
};