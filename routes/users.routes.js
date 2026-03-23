// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

// Importamos express para manejar rutas HTTP
const express = require("express");

// Creamos una instancia del router
const router = express.Router();


// ------------------------------------------------------
// IMPORTAR MIDDLEWARE DE AUTENTICACIÓN
// ------------------------------------------------------

// Middleware que valida el token JWT
// ⚠️ IMPORTANTE: unificamos nombre (antes estaba inconsistente)
const auth = require("../middlewares/auth.middleware");


// ------------------------------------------------------
// IMPORTAR CONTROLADOR
// ------------------------------------------------------

// Controlador de usuarios (lógica de negocio)
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
    auth,                    // requiere token
    userController.getUsers // controller
);


// =======================================================
// OBTENER USUARIOS CON MASCOTAS (🔥 CORREGIDO)
// =======================================================

// ⚠️ IMPORTANTE:
// Esta ruta va antes de "/:id" para evitar conflictos

// Endpoint: GET /api/users/mascotas/all
router.get(
    "/mascotas/all",                    // ruta específica (ANTES decía posts ❌)
    auth,                               // protegido
    userController.getUsersWithMascotas // controller corregido
);


// =======================================================
// OBTENER USUARIO POR ID (PROTEGIDA)
// =======================================================

// Endpoint: GET /api/users/:id
router.get(
    "/:id",                    // parámetro dinámico
    auth,                      // requiere token
    userController.getUserById // controller
);


// =======================================================
// CREAR USUARIO (PÚBLICA)
// =======================================================

// Endpoint: POST /api/users
router.post(
    "/",                       // ruta base
    userController.createUser // no requiere auth
);


// =======================================================
// ACTUALIZAR USUARIO (PROTEGIDA)
// =======================================================

// Endpoint: PUT /api/users/:id
router.put(
    "/:id",                    // id del usuario
    auth,                      // protegido
    userController.updateUser // controller
);


// =======================================================
// ELIMINAR USUARIO (PROTEGIDA)
// =======================================================

// Endpoint: DELETE /api/users/:id
router.delete(
    "/:id",                    // id del usuario
    auth,                      // protegido
    userController.deleteUser // controller
);


// =======================================================
// CREAR USUARIO CON TRANSACCIÓN (🔥 NIVEL PRO)
// =======================================================

// Endpoint: POST /api/users/transaction
router.post(
    "/transaction",                        // ruta específica
    auth,                                  // protegido
    userController.createUserTransaction   // controller
);


// ------------------------------------------------------
// EXPORTAR ROUTER
// ------------------------------------------------------

// Exportamos el router para usarlo en index.js
module.exports = router;