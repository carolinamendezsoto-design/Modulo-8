const userService = require("../services/user.service");


// ------------------------------------------------------
// GET USERS
// ------------------------------------------------------

exports.getUsers = async (req, res, next) => {
    try {
        const users = await userService.getUsers(req.query);

        res.json({
            status: "success",
            message: "Usuarios obtenidos correctamente",
            data: users
        });

    } catch (error) {
        next(error);
    }
};


// ------------------------------------------------------
// GET USER BY ID
// ------------------------------------------------------

exports.getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await userService.getUserById({ id });

        res.json({
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

exports.createUser = async (req, res, next) => {
    try {

        const { nombre, email, password, telefono, rol } = req.body;

        if (!nombre || !email || !password) {
            return res.status(400).json({
                status: "error",
                message: "Campos obligatorios faltantes"
            });
        }

        const newUser = await userService.createUser({
            nombre,
            email,
            password,
            telefono,
            rol
        });

        res.status(201).json({
            status: "success",
            message: "Usuario creado correctamente",
            data: newUser
        });

    } catch (error) {
        next(error);
    }
};


// ------------------------------------------------------
// UPDATE USER
// ------------------------------------------------------

exports.updateUser = async (req, res, next) => {
    try {

        const { id } = req.params;

        const updatedUser = await userService.updateUser({
            id,
            data: req.body
        });

        res.json({
            status: "success",
            message: "Usuario actualizado correctamente",
            data: updatedUser
        });

    } catch (error) {
        next(error);
    }
};


// ------------------------------------------------------
// DELETE USER
// ------------------------------------------------------

exports.deleteUser = async (req, res, next) => {
    try {

        const { id } = req.params;

        await userService.deleteUser({ id });

        res.json({
            status: "success",
            message: "Usuario eliminado correctamente"
        });

    } catch (error) {
        next(error);
    }
};