// ------------------------------------------------------
// IMPORTAR SERVICE
// ------------------------------------------------------

// Importamos el service donde vive la lógica de negocio
const userService = require("../services/user.service");


// ------------------------------------------------------
// GET USERS
// ------------------------------------------------------

const getUsers = async (req, res, next) => {
    try {

        const users = await userService.getUsers(req.query);

        return res.status(200).json({
            status: "success",
            message: "Usuarios obtenidos correctamente",
            data: users
        });

    } catch (error) {
        next(error);
    }
};


// ------------------------------------------------------
// GET USERS WITH MASCOTAS 🔥 NUEVO
// ------------------------------------------------------

const getUsersWithMascotas = async (req, res, next) => {
    try {

        const users = await userService.getUsersWithMascotas();

        return res.status(200).json({
            status: "success",
            message: "Usuarios con mascotas obtenidos correctamente",
            data: users
        });

    } catch (error) {
        next(error);
    }
};


// ------------------------------------------------------
// GET USER BY ID
// ------------------------------------------------------

const getUserById = async (req, res, next) => {
    try {

        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID requerido",
                data: null
            });
        }

        const user = await userService.getUserById({ id });

        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "Usuario no encontrado",
                data: null
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Usuario obtenido correctamente",
            data: user
        });

    } catch (error) {
        next(error);
    }
};


// ------------------------------------------------------
// CREATE USER
// ------------------------------------------------------

const createUser = async (req, res, next) => {
    try {

        const { nombre, email, password, telefono, rol } = req.body;

        if (!nombre || !email || !password) {
            return res.status(400).json({
                status: "error",
                message: "Campos obligatorios faltantes",
                data: null
            });
        }

        const newUser = await userService.createUser({
            nombre,
            email,
            password,
            telefono,
            rol
        });

        return res.status(201).json({
            status: "success",
            message: "Usuario creado correctamente",
            data: newUser
        });

    } catch (error) {
        next(error);
    }
};


// ------------------------------------------------------
// CREATE USER TRANSACTION 🔥 NUEVO
// ------------------------------------------------------

const createUserTransaction = async (req, res, next) => {
    try {

        const user = await userService.createUserTransaction(req.body);

        return res.status(201).json({
            status: "success",
            message: "Usuario creado con transacción",
            data: user
        });

    } catch (error) {
        next(error);
    }
};


// ------------------------------------------------------
// UPDATE USER
// ------------------------------------------------------

const updateUser = async (req, res, next) => {
    try {

        const { id } = req.params;

        const updated = await userService.updateUser({
            id,
            data: req.body
        });

        return res.status(200).json({
            status: "success",
            message: "Usuario actualizado",
            data: updated
        });

    } catch (error) {
        next(error);
    }
};


// ------------------------------------------------------
// DELETE USER
// ------------------------------------------------------

const deleteUser = async (req, res, next) => {
    try {

        const { id } = req.params;

        await userService.deleteUser({ id });

        return res.status(200).json({
            status: "success",
            message: "Usuario eliminado",
            data: null
        });

    } catch (error) {
        next(error);
    }
};


// ------------------------------------------------------
// EXPORTAR TODO 🔥 CLAVE
// ------------------------------------------------------

module.exports = {
    getUsers,
    getUsersWithMascotas,
    getUserById,
    createUser,
    createUserTransaction,
    updateUser,
    deleteUser
};