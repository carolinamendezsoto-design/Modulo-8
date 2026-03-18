// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

// Importamos bcrypt para encriptar contraseñas
const bcrypt = require("bcryptjs");

// Importamos el repository de usuarios
// Este se encarga de comunicarse directamente con la base de datos
const userRepository = require("../repositories/user.repository");


// =======================================================
// OBTENER USUARIOS (CON FILTRO OPCIONAL)
// =======================================================

// Esta función recibe el query (ej: ?nombre=Juan)
exports.getUsers = async (query) => {

    // Creamos un objeto vacío para filtros
    const where = {};

    // Si viene el nombre en la query → lo agregamos como filtro
    if (query?.nombre) {
        where.nombre = query.nombre;
    }

    // Llamamos al repository pasando los filtros
    const usuarios = await userRepository.findAllUsers(where);

    // 🔥 CAMBIO IMPORTANTE:
    // Ahora SOLO devolvemos los datos (no la estructura completa)
    // El controller se encargará de armar la respuesta HTTP
    return usuarios;
};


// =======================================================
// OBTENER USUARIOS CON POSTS
// =======================================================

exports.getUsersWithPosts = async () => {

    // Llamamos al repository para traer usuarios con sus posts
    const usuarios = await userRepository.findUsersWithPosts();

    // Retornamos la respuesta estructurada
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

    // Verificamos que los campos obligatorios existan
    if (!data.nombre || !data.email || !data.password) {

        // Creamos error personalizado
        const error = new Error("Nombre, email y password son obligatorios");

        // Definimos código HTTP 400 (bad request)
        error.statusCode = 400;

        // Lanzamos el error
        throw error;
    }

    // --------------------------------------------------
    // ENCRIPTAR CONTRASEÑA 🔐
    // --------------------------------------------------

    // Generamos hash de la contraseña con 10 salt rounds
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Reemplazamos la contraseña original por la encriptada
    data.password = hashedPassword;

    // --------------------------------------------------
    // CREAR USUARIO EN DB
    // --------------------------------------------------

    // Guardamos el usuario en la base de datos
    const usuario = await userRepository.createUser(data);

    // --------------------------------------------------
    // RESPUESTA SEGURA
    // --------------------------------------------------

    // Retornamos datos SIN la contraseña por seguridad
    return {
        status: "success",
        message: "Usuario creado correctamente",
        data: {
            id: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email
        }
    };
};


// =======================================================
// OBTENER USUARIO POR ID
// =======================================================

exports.getUserById = async ({ id }) => {

    // Buscamos usuario en la base de datos
    const usuario = await userRepository.findUserById(id);

    // Si no existe → lanzamos error 404
    if (!usuario) {
        const error = new Error("Usuario no encontrado");
        error.statusCode = 404;
        throw error;
    }

    // Retornamos el usuario encontrado
    return {
        status: "success",
        message: "Usuario obtenido correctamente",
        data: usuario
    };
};


// =======================================================
// ACTUALIZAR USUARIO
// =======================================================

exports.updateUser = async ({ id, data }) => {

    // Buscamos usuario existente
    const usuario = await userRepository.findUserById(id);

    // Si no existe → error 404
    if (!usuario) {
        const error = new Error("Usuario no encontrado");
        error.statusCode = 404;
        throw error;
    }

    // --------------------------------------------------
    // SI VIENE PASSWORD → ENCRIPTAR
    // --------------------------------------------------

    // Verificamos si el usuario quiere actualizar su contraseña
    if (data.password) {

        // Generamos hash de la nueva contraseña
        const hashedPassword = await bcrypt.hash(data.password, 10);

        // Reemplazamos la contraseña
        data.password = hashedPassword;
    }

    // Actualizamos el usuario en la base de datos
    await userRepository.updateUser(usuario, data);

    // Retornamos confirmación
    return {
        status: "success",
        message: "Usuario actualizado correctamente"
    };
};


// =======================================================
// ELIMINAR USUARIO
// =======================================================

exports.deleteUser = async ({ id }) => {

    // Buscamos usuario por ID
    const usuario = await userRepository.findUserById(id);

    // Si no existe → error 404
    if (!usuario) {
        const error = new Error("Usuario no encontrado");
        error.statusCode = 404;
        throw error;
    }

    // Eliminamos el usuario
    await userRepository.deleteUser(usuario);

    // Retornamos confirmación
    return {
        status: "success",
        message: "Usuario eliminado correctamente"
    };
};


// =======================================================
// CREAR USUARIO CON TRANSACCIÓN
// =======================================================

exports.createUserTransaction = async (data) => {

    // Si viene contraseña → la encriptamos
    if (data.password) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        data.password = hashedPassword;
    }

    // Creamos usuario usando una transacción (seguridad en DB)
    const usuario = await userRepository.createUserWithTransaction(data);

    // Retornamos respuesta segura
    return {
        status: "success",
        message: "Usuario creado con transacción correctamente",
        data: {
            id: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email
        }
    };
};