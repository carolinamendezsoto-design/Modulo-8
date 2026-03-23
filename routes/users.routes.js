// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

// Importamos express para manejar rutas HTTP
const express = require("express");

// Creamos una instancia del router de Express
const router = express.Router();


// ------------------------------------------------------
// IMPORTAR MIDDLEWARE DE AUTENTICACIÓN
// ------------------------------------------------------

// Middleware que valida el token JWT
const auth = require("../middlewares/auth.middleware");


// ------------------------------------------------------
// IMPORTAR CONTROLADOR
// ------------------------------------------------------

// Importamos el controlador de usuarios
// Aquí viven los handlers que se ejecutan en cada ruta
const userController = require("../controllers/user.controller");


// =======================================================
// RUTAS DE USUARIOS
// =======================================================


// =======================================================
// OBTENER TODOS LOS USUARIOS (PROTEGIDA)
// =======================================================

// Endpoint: GET /api/users
router.get(
    "/",                     // ruta base
    auth,                    // middleware → valida JWT
    userController.getUsers  // handler → función del controller
);


// =======================================================
// OBTENER USUARIOS CON MASCOTAS
// =======================================================

// Endpoint: GET /api/users/mascotas/all
router.get(
    "/mascotas/all",
    auth,
    userController.getUsersWithMascotas // 🔥 AHORA EXISTE
);


// =======================================================
// OBTENER USUARIO POR ID
// =======================================================

router.get(
    "/:id",
    auth,
    userController.getUserById
);


// =======================================================
// CREAR USUARIO
// =======================================================

router.post(
    "/",
    userController.createUser
);


// =======================================================
// ACTUALIZAR USUARIO
// =======================================================

router.put(
    "/:id",
    auth,
    userController.updateUser
);


// =======================================================
// ELIMINAR USUARIO
// =======================================================

router.delete(
    "/:id",
    auth,
    userController.deleteUser
);


// =======================================================
// CREAR USUARIO CON TRANSACCIÓN
// =======================================================

router.post(
    "/transaction",
    auth,
    userController.createUserTransaction // 🔥 AHORA EXISTE
);


// ------------------------------------------------------
// EXPORTAR ROUTER
// ------------------------------------------------------

module.exports = router;