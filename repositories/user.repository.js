// ------------------------------------------------------
// IMPORTAR MODELOS
// ------------------------------------------------------

// Importamos el modelo User
// Representa la tabla de usuarios en la base de datos
const User = require("../models/user");

// Importamos el modelo Mascota (ANTES era Post ❌)
// Se usa para la relación entre usuarios y mascotas
const Mascota = require("../models/mascota");

// Importamos Sequelize para transacciones
const { sequelize } = require("../config/database");


// =======================================================
// OBTENER TODOS LOS USUARIOS (CON FILTROS)
// =======================================================

exports.findAllUsers = async (where) => {

    // Buscamos usuarios en la base de datos
    return await User.findAll({

        // Aplicamos filtros (si existen)
        where,

        // Excluimos la contraseña por seguridad
        attributes: { exclude: ["password"] }

    });

};


// =======================================================
// OBTENER USUARIOS CON MASCOTAS (RELACIÓN)
// =======================================================

exports.findUsersWithMascotas = async () => {

    return await User.findAll({

        // Incluimos la relación con Mascota
        include: {
            model: Mascota,              // modelo relacionado
            as: "mascotas",              // alias definido en user.js
            attributes: [               // campos que queremos mostrar
                "id",
                "nombre",
                "edad",
                "estado"
            ]
        },

        // Ocultamos password por seguridad
        attributes: { exclude: ["password"] }

    });

};


// =======================================================
// CREAR USUARIO
// =======================================================

exports.createUser = async (data) => {

    // Creamos un nuevo usuario en la base de datos
    return await User.create(data);

};


// =======================================================
// BUSCAR USUARIO POR ID
// =======================================================

exports.findUserById = async (id) => {

    // Buscamos un usuario por su ID
    return await User.findByPk(id);

};


// =======================================================
// ACTUALIZAR USUARIO
// =======================================================

exports.updateUser = async (usuario, data) => {

    // Actualizamos los datos del usuario existente
    return await usuario.update(data);

};


// =======================================================
// ELIMINAR USUARIO
// =======================================================

exports.deleteUser = async (usuario) => {

    // Eliminamos el usuario de la base de datos
    return await usuario.destroy();

};


// =======================================================
// CREAR USUARIO CON TRANSACCIÓN
// =======================================================

exports.createUserWithTransaction = async (data) => {

    // Iniciamos una transacción
    const t = await sequelize.transaction();

    try {

        // Creamos el usuario dentro de la transacción
        const usuario = await User.create(data, { transaction: t });

        // Simulación de otra operación (ej: log)
        console.log("Log: usuario creado ->", usuario.email);

        // Confirmamos la transacción (todo OK)
        await t.commit();

        // Retornamos el usuario creado
        return usuario;

    } catch (error) {

        // Si ocurre un error, revertimos todo
        await t.rollback();

        // Lanzamos el error nuevamente
        throw error;
    }

};