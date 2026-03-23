// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

// Importamos el repository (capa que habla con la base de datos)
const userRepository = require("../repositories/user.repository");


// =======================================================
// OBTENER USUARIOS (CON FILTROS)
// =======================================================

// Función para obtener usuarios con filtros opcionales
const getUsers = async (query = {}) => {

    // Validamos que query sea un objeto
    if (typeof query !== "object") {

        // Creamos error personalizado
        const error = new Error("Filtros inválidos");

        // Código HTTP
        error.statusCode = 400;

        // Lanzamos error
        throw error;
    }

    // Creamos objeto where limpio para Sequelize
    const where = {};

    // Si viene nombre → filtramos
    if (query.nombre) {
        where.nombre = query.nombre;
    }

    // Si viene rol → filtramos
    if (query.rol) {
        where.rol = query.rol;
    }

    // Llamamos al repository para obtener usuarios
    const users = await userRepository.findAllUsers(where);

    // Retornamos resultado
    return users;
};


// =======================================================
// OBTENER USUARIOS CON MASCOTAS
// =======================================================

// Función para traer usuarios con relaciones (JOIN)
const getUsersWithMascotas = async () => {

    // Llamamos directamente al repository
    return await userRepository.findUsersWithMascotas();
};


// =======================================================
// CREAR USUARIO
// =======================================================

// Función para crear un usuario nuevo
const createUser = async (data) => {

    // --------------------------------------------------
    // VALIDACIONES
    // --------------------------------------------------

    // Validamos que data exista y sea objeto
    if (!data || typeof data !== "object") {

        const error = new Error("Datos inválidos");
        error.statusCode = 400;
        throw error;
    }

    // Validamos campos obligatorios
    if (!data.nombre || !data.email || !data.password) {

        const error = new Error("Nombre, email y password son obligatorios");
        error.statusCode = 400;
        throw error;
    }

    // --------------------------------------------------
    // VALIDAR ROL
    // --------------------------------------------------

    // Lista de roles permitidos
    const rolesValidos = ["admin", "adoptante", "rescatista"];

    // Si no viene rol → default adoptante
    if (!data.rol) {
        data.rol = "adoptante";
    }

    // Validamos que el rol sea válido
    if (!rolesValidos.includes(data.rol)) {

        const error = new Error("Rol inválido");
        error.statusCode = 400;
        throw error;
    }

    // --------------------------------------------------
    // IMPORTANTE
    // --------------------------------------------------

    // 🚨 NO encriptamos password aquí
    // Esto lo hace el HOOK del modelo automáticamente

    // --------------------------------------------------
    // CREAR USUARIO
    // --------------------------------------------------

    // Llamamos al repository
    const usuario = await userRepository.createUser(data);

    // Retornamos usuario sin password (seguridad)
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

// Función para obtener un usuario específico
const getUserById = async ({ id }) => {

    // Validamos que venga ID
    if (!id) {

        const error = new Error("ID requerido");
        error.statusCode = 400;
        throw error;
    }

    // Buscamos usuario
    const usuario = await userRepository.findUserById(id);

    // Si no existe
    if (!usuario) {

        const error = new Error("Usuario no encontrado");
        error.statusCode = 404;
        throw error;
    }

    // Retornamos usuario
    return usuario;
};


// =======================================================
// ACTUALIZAR USUARIO
// =======================================================

// Función para actualizar usuario
const updateUser = async ({ id, data }) => {

    // Validamos ID
    if (!id) {

        const error = new Error("ID requerido");
        error.statusCode = 400;
        throw error;
    }

    // Validamos data
    if (!data || typeof data !== "object") {

        const error = new Error("Datos inválidos");
        error.statusCode = 400;
        throw error;
    }

    // Buscamos usuario
    const usuario = await userRepository.findUserById(id);

    // Si no existe
    if (!usuario) {

        const error = new Error("Usuario no encontrado");
        error.statusCode = 404;
        throw error;
    }

    // --------------------------------------------------
    // VALIDAR ROL (SI VIENE)
    // --------------------------------------------------

    if (data.rol) {

        const rolesValidos = ["admin", "adoptante", "rescatista"];

        if (!rolesValidos.includes(data.rol)) {

            const error = new Error("Rol inválido");
            error.statusCode = 400;
            throw error;
        }
    }

    // --------------------------------------------------
    // IMPORTANTE
    // --------------------------------------------------

    // 🚨 NO encriptamos password aquí
    // Sequelize hook se encarga automáticamente

    // Actualizamos usuario
    await userRepository.updateUser(usuario, data);

    // Retornamos mensaje
    return {
        message: "Usuario actualizado correctamente"
    };
};


// =======================================================
// ELIMINAR USUARIO
// =======================================================

// Función para eliminar usuario
const deleteUser = async ({ id }) => {

    // Validamos ID
    if (!id) {

        const error = new Error("ID requerido");
        error.statusCode = 400;
        throw error;
    }

    // Buscamos usuario
    const usuario = await userRepository.findUserById(id);

    // Si no existe
    if (!usuario) {

        const error = new Error("Usuario no encontrado");
        error.statusCode = 404;
        throw error;
    }

    // Eliminamos usuario
    await userRepository.deleteUser(usuario);

    // Retornamos mensaje
    return {
        message: "Usuario eliminado correctamente"
    };
};


// =======================================================
// CREAR USUARIO CON TRANSACCIÓN
// =======================================================

// Función avanzada (opcional)
const createUserTransaction = async (data) => {

    // Validamos datos
    if (!data || typeof data !== "object") {

        const error = new Error("Datos inválidos");
        error.statusCode = 400;
        throw error;
    }

    // 🚨 NO encriptamos aquí tampoco

    // Creamos usuario con transacción
    const usuario = await userRepository.createUserWithTransaction(data);

    // Retornamos sin password
    return {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        telefono: usuario.telefono,
        rol: usuario.rol
    };
};


// ------------------------------------------------------
// EXPORTAR TODAS LAS FUNCIONES (CLAVE DEL ERROR)
// ------------------------------------------------------

module.exports = {
    getUsers,
    getUsersWithMascotas,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    createUserTransaction
};