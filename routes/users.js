// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

// Importamos Express para manejar rutas HTTP
const express = require("express");

// Creamos una instancia del router de Express
// Esto permite separar las rutas del archivo principal
const router = express.Router();


// ------------------------------------------------------
// IMPORTAR MIDDLEWARE DE AUTENTICACIÓN
// ------------------------------------------------------

// Importamos el middleware que valida el token JWT
// Se usará para proteger rutas privadas
const auth = require("../middlewares/auth");


// ------------------------------------------------------
// IMPORTAR CONTROLLER
// ------------------------------------------------------

// Importamos el controlador de usuarios
// Aquí está la lógica de cada endpoint
const userController = require("../controllers/user.controller");


// =======================================================
// RUTAS DE USUARIOS
// =======================================================


// ------------------------------------------------------
// OBTENER TODOS LOS USUARIOS (PROTEGIDA)
// ------------------------------------------------------

// Endpoint: GET /api/users
// Retorna todos los usuarios
router.get(
    "/",                     // ruta base
    auth,                    // requiere token
    userController.getUsers // función del controller
);


// ------------------------------------------------------
// OBTENER USUARIOS CON POSTS (PROTEGIDA)
// ------------------------------------------------------

// ⚠️ IMPORTANTE:
// Esta ruta va antes de "/:id" para evitar conflictos

// Endpoint: GET /api/users/posts/all
router.get(
    "/posts/all",                     // ruta específica
    auth,                             // protegida
    userController.getUsersWithPosts // controller
);


// ------------------------------------------------------
// OBTENER USUARIO POR ID (PROTEGIDA)
// ------------------------------------------------------

// Endpoint: GET /api/users/:id
// Retorna un usuario específico
router.get(
    "/:id",                    // parámetro dinámico
    auth,                      // requiere token
    userController.getUserById // función creada correctamente
);


// ------------------------------------------------------
// CREAR USUARIO (PÚBLICA)
// ------------------------------------------------------

// Endpoint: POST /api/users
// Permite registrar un nuevo usuario
router.post(
    "/",                       // ruta base
    userController.createUser // no requiere auth
);


// ------------------------------------------------------
// ACTUALIZAR USUARIO (PROTEGIDA)
// ------------------------------------------------------

// Endpoint: PUT /api/users/:id
// Actualiza un usuario existente
router.put(
    "/:id",                    // id del usuario
    auth,                      // requiere token
    userController.updateUser // controller
);


// ------------------------------------------------------
// ELIMINAR USUARIO (PROTEGIDA)
// ------------------------------------------------------

// Endpoint: DELETE /api/users/:id
// Elimina un usuario
router.delete(
    "/:id",                    // id del usuario
    auth,                      // requiere token
    userController.deleteUser // controller
);


// ------------------------------------------------------
// CREAR USUARIO CON TRANSACCIÓN (PROTEGIDA)
// ------------------------------------------------------

// Endpoint: POST /api/users/transaction
// Crea un usuario usando transacciones (nivel más avanzado)
router.post(
    "/transaction",                     // ruta específica
    auth,                              // requiere token
    userController.createUserTransaction // controller
);


// ------------------------------------------------------
// EXPORTAR ROUTER
// ------------------------------------------------------

// Exportamos el router para usarlo en index.js
module.exports = router;