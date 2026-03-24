// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

const express = require("express"); // Framework
const router = express.Router(); // Router

// Middleware auth
const authMiddleware = require("../middlewares/auth.middleware");

// Controller
const notificacionController = require("../controllers/notificacion.controller");


// ------------------------------------------------------
// RUTA: OBTENER NOTIFICACIONES
// ------------------------------------------------------

router.get(
    "/", // endpoint: /api/notificaciones
    authMiddleware, // protegida
    notificacionController.getNotificaciones // controller
);


// ------------------------------------------------------
// RUTA: MARCAR COMO LEÍDAS
// ------------------------------------------------------

router.put(
    "/leer", // endpoint: /api/notificaciones/leer
    authMiddleware, // protegida
    notificacionController.marcarLeidas // controller
);


// ------------------------------------------------------
// EXPORTAR
// ------------------------------------------------------

module.exports = router;