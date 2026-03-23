// ------------------------------------------------------
// IMPORTAR SERVICE
// ------------------------------------------------------

// Importamos el servicio donde vive la lógica de usuarios
const userService = require("../services/user.service");


// ------------------------------------------------------
// GET USERS
// ------------------------------------------------------

exports.getUsers = async (req, res, next) => {
    try {

        // Llamamos al service pasando filtros opcionales (query params)
        const users = await userService.getUsers(req.query);

        // Respuesta estándar API
        return res.status(200).json({
            status: "success",
            message: "Usuarios obtenidos correctamente",
            data: users
        });

    } catch (error) {
        next(error); // delegamos al middleware global
    }
};


// ------------------------------------------------------
// GET USER BY ID
// ------------------------------------------------------

exports.getUserById = async (req, res, next) => {
    try {

        // Extraemos id desde la URL
        const { id } = req.params;

        // Validamos que exista el id
        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID de usuario requerido",
                data: null
            });
        }

        // Llamamos al service
        const user = await userService.getUserById({ id });

        // Validamos si no existe
        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "Usuario no encontrado",
                data: null
            });
        }

        // Respuesta correcta
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

exports.createUser = async (req, res, next) => {
    try {

        // Extraemos datos del body
        const { nombre, email, password, telefono, rol } = req.body;

        // --------------------------------------------------
        // VALIDACIONES (🔥 IMPORTANTE)
        // --------------------------------------------------

        // Validamos campos obligatorios
        if (!nombre || !email || !password) {
            return res.status(400).json({
                status: "error",
                message: "Nombre, email y contraseña son obligatorios",
                data: null
            });
        }

        // Validamos formato básico de email
        if (!email.includes("@")) {
            return res.status(400).json({
                status: "error",
                message: "Email inválido",
                data: null
            });
        }

        // Validamos longitud de contraseña
        if (password.length < 6) {
            return res.status(400).json({
                status: "error",
                message: "La contraseña debe tener al menos 6 caracteres",
                data: null
            });
        }

        // --------------------------------------------------
        // CREAR USUARIO
        // --------------------------------------------------

        const newUser = await userService.createUser({
            nombre,
            email,
            password,
            telefono,
            rol
        });

        // Respuesta exitosa
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
// UPDATE USER
// ------------------------------------------------------

exports.updateUser = async (req, res, next) => {
    try {

        // Extraemos id
        const { id } = req.params;

        // Validamos id
        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID requerido",
                data: null
            });
        }

        // --------------------------------------------------
        // VALIDACIÓN BÁSICA DE DATOS
        // --------------------------------------------------

        if (req.body.email && !req.body.email.includes("@")) {
            return res.status(400).json({
                status: "error",
                message: "Email inválido",
                data: null
            });
        }

        // Llamamos al service
        const updatedUser = await userService.updateUser({
            id,
            data: req.body
        });

        // Validamos si no existe
        if (!updatedUser) {
            return res.status(404).json({
                status: "error",
                message: "Usuario no encontrado",
                data: null
            });
        }

        return res.status(200).json({
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

        // Extraemos id
        const { id } = req.params;

        // Validamos id
        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID requerido",
                data: null
            });
        }

        // Eliminamos usuario
        const deleted = await userService.deleteUser({ id });

        // Validamos si no existía
        if (!deleted) {
            return res.status(404).json({
                status: "error",
                message: "Usuario no encontrado",
                data: null
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Usuario eliminado correctamente",
            data: null
        });

    } catch (error) {
        next(error);
    }
};