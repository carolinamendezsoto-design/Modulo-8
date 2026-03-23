// ------------------------------------------------------
// MIDDLEWARE DE ERRORES MULTER
// ------------------------------------------------------

const handleMulterError = (err, req, res, next) => {

    // Error propio de multer
    if (err instanceof multer.MulterError) {

        if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({
                status: "error",
                message: "El archivo supera el tamaño máximo permitido (5MB)",
                data: null
            });
        }

        return res.status(400).json({
            status: "error",
            message: err.message,
            data: null
        });
    }

    // Error personalizado
    if (err) {
        return res.status(400).json({
            status: "error",
            message: err.message,
            data: null
        });
    }

    next();
};