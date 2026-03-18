// ------------------------------------------------------
// IMPORTAR SERVICIO
// ------------------------------------------------------

// Importamos el servicio de usuarios
// Aquí está toda la lógica de negocio (validaciones, DB, etc.)
const userService = require("../services/user.service");


// ------------------------------------------------------
// OBTENER TODOS LOS USUARIOS
// ------------------------------------------------------

// Controlador que maneja GET /api/users
exports.getUsers = async (req, res, next) => {

    try {

        // Llamamos al service enviando los query params (filtros)
        const users = await userService.getUsers(req.query);

        // 🔥 AHORA el controller arma la respuesta
        res.json({
            status: "success", // estado de la respuesta
            message: "Usuarios obtenidos correctamente", // mensaje
            data: users // datos obtenidos desde el service
        });

    } catch (error) {

        // Enviamos el error al middleware global
        next(error);
    }
};


// ------------------------------------------------------
// OBTENER USUARIO POR ID
// ------------------------------------------------------

// Controlador que maneja GET /api/users/:id
exports.getUserById = async (req, res, next) => {

    try {

        // Obtenemos el id desde la URL
        const { id } = req.params;

        // Llamamos al service enviando el id
        const result = await userService.getUserById({ id });

        // Respondemos con el usuario encontrado
        res.json(result);

    } catch (error) {

        // Enviamos el error al middleware global
        next(error);
    }
};


// ------------------------------------------------------
// CREAR USUARIO
// ------------------------------------------------------

// Controlador que maneja POST /api/users
exports.createUser = async (req, res, next) => {

    try {

        // Enviamos el body al service
        const result = await userService.createUser(req.body);

        // Respondemos con status 201 (creado)
        res.status(201).json(result);

    } catch (error) {

        // Enviamos el error al middleware
        next(error);
    }
};


// ------------------------------------------------------
// ACTUALIZAR USUARIO
// ------------------------------------------------------

// Controlador que maneja PUT /api/users/:id
exports.updateUser = async (req, res, next) => {

    try {

        // Obtenemos el id desde la URL
        const { id } = req.params;

        // Llamamos al service con id y datos nuevos
        const result = await userService.updateUser({
            id,
            data: req.body
        });

        // Respondemos con confirmación
        res.json(result);

    } catch (error) {

        // Enviamos error al middleware
        next(error);
    }
};


// ------------------------------------------------------
// ELIMINAR USUARIO
// ------------------------------------------------------

// Controlador que maneja DELETE /api/users/:id
exports.deleteUser = async (req, res, next) => {

    try {

        // Obtenemos el id desde la URL
        const { id } = req.params;

        // Llamamos al service para eliminar el usuario
        const result = await userService.deleteUser({ id });

        // Respondemos con confirmación
        res.json(result);

    } catch (error) {

        // Enviamos error al middleware
        next(error);
    }
};


// ------------------------------------------------------
// OBTENER USUARIOS CON POSTS
// ------------------------------------------------------

// Controlador que maneja GET /api/users/posts/all
exports.getUsersWithPosts = async (req, res, next) => {

    try {

        // Llamamos al service para obtener usuarios con posts
        const result = await userService.getUsersWithPosts();

        // Respondemos con los datos
        res.json(result);

    } catch (error) {

        // Enviamos error al middleware
        next(error);
    }
};


// ------------------------------------------------------
// CREAR USUARIO CON TRANSACCIÓN
// ------------------------------------------------------

// Controlador que maneja POST /api/users/transaction
exports.createUserTransaction = async (req, res, next) => {

    try {

        // Enviamos los datos al service
        const result = await userService.createUserTransaction(req.body);

        // Respondemos con status 201 (creado)
        res.status(201).json(result);

    } catch (error) {

        // Enviamos error al middleware
        next(error);
    }
};