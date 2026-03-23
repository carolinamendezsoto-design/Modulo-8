// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

const express = require("express");
const router = express.Router();


// ------------------------------------------------------
// IMPORTAR CONTROLADOR
// ------------------------------------------------------

const solicitudController = require("../controllers/solicitud.controller");


// ------------------------------------------------------
// IMPORTAR MIDDLEWARE
// ------------------------------------------------------

const auth = require("../middlewares/auth.middleware");


// =======================================================
// 🔥 RUTAS ESPECÍFICAS (ANTES DE /:id)
// =======================================================


// ------------------------------------------------------
// MIS SOLICITUDES (USUARIO)
// ------------------------------------------------------

// GET /api/solicitudes/mis-solicitudes
router.get(
    "/mis-solicitudes",
    auth,
    solicitudController.getMisSolicitudes
);


// ------------------------------------------------------
// SOLICITUDES POR MASCOTA (POSTULANTES)
// ------------------------------------------------------

// GET /api/solicitudes/mascota/:mascotaId
router.get(
    "/mascota/:mascotaId",
    auth,
    solicitudController.getSolicitudesByMascota
);


// ------------------------------------------------------
// SELECCIONAR ADOPTANTE
// ------------------------------------------------------

// PUT /api/solicitudes/:id/seleccionar
router.put(
    "/:id/seleccionar",
    auth,
    solicitudController.seleccionarAdoptante
);


// ------------------------------------------------------
// RECHAZAR SOLICITUD
// ------------------------------------------------------

// PUT /api/solicitudes/:id/rechazar
router.put(
    "/:id/rechazar",
    auth,
    solicitudController.rechazarSolicitud
);


// =======================================================
// 📦 CRUD / CONSULTAS GENERALES
// =======================================================


// ------------------------------------------------------
// CREAR SOLICITUD
// ------------------------------------------------------

// POST /api/solicitudes
router.post(
    "/",
    auth,
    solicitudController.createSolicitud
);


// ------------------------------------------------------
// OBTENER TODAS (ADMIN)
// ------------------------------------------------------

// GET /api/solicitudes
router.get(
    "/",
    auth,
    solicitudController.getAllSolicitudes
);


// ------------------------------------------------------
// EXPORTAR ROUTER
// ------------------------------------------------------

module.exports = router;