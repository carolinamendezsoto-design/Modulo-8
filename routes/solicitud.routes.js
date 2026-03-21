// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

const express = require("express");
const router = express.Router();

const solicitudController = require("../controllers/solicitud.controller");
const auth = require("../middlewares/auth.middleware");


// ------------------------------------------------------
// RUTAS SOLICITUDES
// ------------------------------------------------------

// Crear solicitud (postular)
router.post("/", auth, solicitudController.createSolicitud);

// Ver solicitudes de una mascota
router.get("/mascota/:mascotaId", auth, solicitudController.getSolicitudesByMascota);

// Seleccionar adoptante (🔥 lógica final)
router.put("/:id/seleccionar", auth, solicitudController.seleccionarAdoptante);


// ------------------------------------------------------

module.exports = router;