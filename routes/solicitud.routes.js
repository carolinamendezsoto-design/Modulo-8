// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

// Importamos express para crear rutas
const express = require("express");

// Creamos una instancia del router
const router = express.Router();


// ------------------------------------------------------
// IMPORTAR CONTROLADOR
// ------------------------------------------------------

// Importamos el controlador de solicitudes
const solicitudController = require("../controllers/solicitud.controller");


// ------------------------------------------------------
// IMPORTAR MIDDLEWARE
// ------------------------------------------------------

// Importamos middleware de autenticación (JWT)
const auth = require("../middlewares/auth.middleware");


// ------------------------------------------------------
// CREAR SOLICITUD
// ------------------------------------------------------

// Endpoint: POST /api/solicitudes
// Crea una nueva solicitud de adopción
router.post(
    "/",                              // Ruta base
    auth,                             // Requiere usuario autenticado
    solicitudController.createSolicitud // Controlador que crea la solicitud
);


// ------------------------------------------------------
// OBTENER POSTULANTES POR MASCOTA
// ------------------------------------------------------

// Endpoint: GET /api/solicitudes/mascota/:id
// Obtiene todas las solicitudes de una mascota específica
router.get(
    "/mascota/:id",                   // Recibe id de mascota
    auth,                             // Requiere login
    solicitudController.getSolicitudesByMascota // Controlador
);


// ------------------------------------------------------
// SELECCIONAR ADOPTANTE
// ------------------------------------------------------

// Endpoint: PUT /api/solicitudes/seleccionar/:id
// Permite aprobar una solicitud y completar la adopción
router.put(
    "/seleccionar/:id",               // Recibe id de solicitud
    auth,                             // Protegido
    solicitudController.seleccionarAdoptante // Controlador
);


// ------------------------------------------------------
// EXPORTAR ROUTER
// ------------------------------------------------------

// Exportamos router para usarlo en app.js
module.exports = router;