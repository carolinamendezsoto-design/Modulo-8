// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

// Importamos express para definir rutas HTTP
const express = require("express");

// Creamos instancia del router
const router = express.Router();


// ------------------------------------------------------
// IMPORTAR CONTROLADOR
// ------------------------------------------------------

// Controlador donde está la lógica de solicitudes
const solicitudController = require("../controllers/solicitud.controller");


// ------------------------------------------------------
// IMPORTAR MIDDLEWARE DE AUTENTICACIÓN
// ------------------------------------------------------

// Middleware que valida el token JWT
const auth = require("../middlewares/auth.middleware");


// ------------------------------------------------------
// RUTAS DE SOLICITUDES
// ------------------------------------------------------


// =======================================================
// CREAR SOLICITUD (POSTULAR A UNA MASCOTA)
// =======================================================

// Endpoint: POST /api/solicitudes
// Permite que un usuario postule a una mascota
router.post(
    "/",                              // ruta base
    auth,                             // requiere token
    solicitudController.createSolicitud // controller
);


// =======================================================
// OBTENER SOLICITUDES POR MASCOTA (POSTULANTES)
// =======================================================

// Endpoint: GET /api/solicitudes/mascota/:mascotaId
// Permite al rescatista ver quién postuló
router.get(
    "/mascota/:mascotaId",                   // id de la mascota
    auth,                                    // protegido
    solicitudController.getSolicitudesByMascota // controller
);


// =======================================================
// OBTENER MIS SOLICITUDES (🔥 NIVEL PRO)
// =======================================================

// Endpoint: GET /api/solicitudes/mis-solicitudes
// Permite al usuario ver a qué mascotas postuló
router.get(
    "/mis-solicitudes",                // ruta específica
    auth,                              // requiere token
    solicitudController.getMisSolicitudes // controller
);


// =======================================================
// SELECCIONAR ADOPTANTE (🔥 FLUJO FINAL)
// =======================================================

// Endpoint: PUT /api/solicitudes/:id/seleccionar
// El rescatista aprueba una solicitud
router.put(
    "/:id/seleccionar",                 // id de la solicitud
    auth,                               // protegido
    solicitudController.seleccionarAdoptante // controller
);


// =======================================================
// RECHAZAR SOLICITUD (🔥 NIVEL PRO)
// =======================================================

// Endpoint: PUT /api/solicitudes/:id/rechazar
// Permite rechazar una solicitud
router.put(
    "/:id/rechazar",                    // id de la solicitud
    auth,                               // protegido
    solicitudController.rechazarSolicitud // controller
);


// =======================================================
// OBTENER TODAS LAS SOLICITUDES (ADMIN)
// =======================================================

// Endpoint: GET /api/solicitudes
// Solo para admin (puedes validar rol en middleware después)
router.get(
    "/",                               // ruta base
    auth,                               // protegido
    solicitudController.getAllSolicitudes // controller
);


// ------------------------------------------------------
// EXPORTAR ROUTER
// ------------------------------------------------------

// Exportamos el router para usarlo en index.js
module.exports = router;