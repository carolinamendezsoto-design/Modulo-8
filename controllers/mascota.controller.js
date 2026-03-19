// ------------------------------------------------------
// IMPORTAR SERVICE
// ------------------------------------------------------

// Importamos el servicio de mascotas
// Aquí está la lógica de negocio (intermediario con repository)
const mascotaService = require("../services/mascota.service");


// ------------------------------------------------------
// OBTENER TODAS LAS MASCOTAS
// ------------------------------------------------------

// Controlador que maneja GET /api/mascotas
const getMascotas = async (req, res, next) => {
    try {

        // Llamamos al service pasando posibles filtros (query params)
        const result = await mascotaService.getMascotas(req.query);

        // Respondemos con las mascotas obtenidas
        res.json(result);

    } catch (error) {

        // Si ocurre error, lo enviamos al middleware global
        next(error);
    }
};


// ------------------------------------------------------
// OBTENER MASCOTA POR ID
// ------------------------------------------------------

// Controlador que maneja GET /api/mascotas/:id
const getMascotaById = async (req, res, next) => {
    try {

        // Enviamos los parámetros (id) al service
        const result = await mascotaService.getMascotaById(req.params);

        // Respondemos con la mascota encontrada
        res.json(result);

    } catch (error) {

        // Delegamos el error
        next(error);
    }
};


// ------------------------------------------------------
// CREAR MASCOTA
// ------------------------------------------------------

// Controlador que maneja POST /api/mascotas
const createMascota = async (req, res, next) => {
    try {

        // ---------------------------------
        // VALIDACIÓN DE DESCRIPCIÓN
        // ---------------------------------

        // Verificamos que exista descripción y tenga mínimo 10 caracteres
        if (!req.body.descripcion || req.body.descripcion.length < 10) {
            return res.status(400).json({
                message: "La descripción debe tener al menos 10 caracteres"
            });
        }

        // ---------------------------------
        // PREPARAR DATOS
        // ---------------------------------

        // Construimos el objeto que se enviará al service
        const data = {

            // Nombre de la mascota
            nombre: req.body.nombre,

            // Edad de la mascota
            edad: req.body.edad,

            // Porte (reemplaza tamaño)
            porte: req.body.porte,

            // Nivel de energía
            energia: req.body.energia,

            // Descripción obligatoria
            descripcion: req.body.descripcion,

            // Usuario autenticado (rescatista)
            // Viene del middleware de autenticación (JWT)
            userId: req.user.id,

            // Imagen subida con multer
            // Si existe archivo, guardamos su nombre
            imagen: req.file ? req.file.filename : null

        };

        // ---------------------------------
        // CREAR EN BASE DE DATOS
        // ---------------------------------

        // Llamamos al service para guardar la mascota
        const result = await mascotaService.createMascota(data);

        // ---------------------------------
        // RESPUESTA
        // ---------------------------------

        // Respondemos con status 201 (creado)
        res.status(201).json(result);

    } catch (error) {

        // Delegamos el error al middleware global
        next(error);
    }
};


// ------------------------------------------------------
// ACTUALIZAR MASCOTA
// ------------------------------------------------------

// Controlador que maneja PUT /api/mascotas/:id
const updateMascota = async (req, res, next) => {
    try {

        // Creamos objeto con datos a actualizar
        const data = {

            // Copiamos todos los datos del body
            ...req.body,

            // Si viene una nueva imagen, la actualizamos
            ...(req.file && { imagen: req.file.filename })

        };

        // Llamamos al service con id + datos
        const result = await mascotaService.updateMascota({
            id: req.params.id,
            data
        });

        // Respondemos con el resultado
        res.json(result);

    } catch (error) {

        // Delegamos error
        next(error);
    }
};


// ------------------------------------------------------
// ELIMINAR MASCOTA
// ------------------------------------------------------

// Controlador que maneja DELETE /api/mascotas/:id
const deleteMascota = async (req, res, next) => {
    try {

        // Enviamos el id al service
        const result = await mascotaService.deleteMascota(req.params);

        // Respondemos con el resultado
        res.json(result);

    } catch (error) {

        // Delegamos error
        next(error);
    }
};


// ------------------------------------------------------
// EXPORTAR CONTROLADOR
// ------------------------------------------------------

// Exportamos todas las funciones para usarlas en las rutas
module.exports = {
    getMascotas,
    getMascotaById,
    createMascota,
    updateMascota,
    deleteMascota
};