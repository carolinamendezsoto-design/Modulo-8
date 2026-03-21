// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

const express = require("express");
const router = express.Router();

// Controlador
const mascotaController = require("../controllers/mascota.controller");

// Middleware auth
const auth = require("../middlewares/auth.middleware");

// Multer
const upload = require("../middlewares/upload.middleware");


// ------------------------------------------------------
// RUTAS
// ------------------------------------------------------

// Obtener todas
router.get("/", mascotaController.getMascotas);

// Obtener por ID
router.get("/:id", mascotaController.getMascotaById);

// Crear mascota (con imagen 🔥)
router.post(
    "/",
    auth,
    upload.single("imagen"), // multer
    mascotaController.createMascota
);

// Actualizar mascota (puede cambiar imagen)
router.put(
    "/:id",
    auth,
    upload.single("imagen"),
    mascotaController.updateMascota
);

// Eliminar
router.delete("/:id", auth, mascotaController.deleteMascota);

// Match
router.get("/match/filtro", mascotaController.getMatchMascotas);


// ------------------------------------------------------

module.exports = router;