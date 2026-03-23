// ------------------------------------------------------
// IMPORTAR SERVICIO
// ------------------------------------------------------

// Importamos el service donde vive la lógica de autenticación
// (registro, login, hash, token, etc.)
const authService = require("../services/auth.service");


// ------------------------------------------------------
// CONTROLADOR REGISTER (🔥 NUEVO)
// ------------------------------------------------------

// Este controlador maneja el registro de usuarios
const register = async (req, res) => {

    try {

        // --------------------------------------------------
        // EXTRAER DATOS DEL BODY
        // --------------------------------------------------

        // Obtenemos los datos enviados desde el frontend
        const { nombre, email, telefono, password, rol } = req.body;


        // --------------------------------------------------
        // VALIDACIONES BÁSICAS
        // --------------------------------------------------

        // Validamos campos obligatorios
        if (!nombre || !email || !telefono || !password || !rol) {
            return res.status(400).json({
                status: "error",
                message: "Todos los campos son obligatorios",
                data: null
            });
        }

        // Validación formato email
        const emailRegex = /\S+@\S+\.\S+/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                status: "error",
                message: "Formato de email inválido",
                data: null
            });
        }

        // Validación password mínimo
        if (password.length < 4) {
            return res.status(400).json({
                status: "error",
                message: "La contraseña debe tener al menos 4 caracteres",
                data: null
            });
        }

        // Validación rol permitido
        const rolesPermitidos = ["adoptante", "rescatista", "admin"];

        if (!rolesPermitidos.includes(rol)) {
            return res.status(400).json({
                status: "error",
                message: "Rol inválido",
                data: null
            });
        }


        // --------------------------------------------------
        // LLAMAR AL SERVICE
        // --------------------------------------------------

        // Enviamos los datos al service para crear usuario
        const result = await authService.register({
            nombre: nombre.trim(),
            email: email.toLowerCase().trim(),
            telefono: telefono.trim(),
            password,
            rol
        });


        // --------------------------------------------------
        // RESPUESTA EXITOSA
        // --------------------------------------------------

        return res.status(201).json({
            status: "success",
            message: "Usuario registrado correctamente",
            data: result
        });

    } catch (error) {

        console.error("ERROR REGISTER:", error);


        // --------------------------------------------------
        // ERRORES CONTROLADOS (desde service)
        // --------------------------------------------------

        if (error.statusCode) {
            return res.status(error.statusCode).json({
                status: "error",
                message: error.message,
                data: null
            });
        }


        // --------------------------------------------------
        // ERROR GENERAL
        // --------------------------------------------------

        return res.status(500).json({
            status: "error",
            message: "Error interno en registro",
            data: null
        });
    }
};



// ------------------------------------------------------
// CONTROLADOR LOGIN
// ------------------------------------------------------

// Este controlador maneja el login de usuarios
const login = async (req, res) => {

    try {

        // --------------------------------------------------
        // EXTRAER DATOS DEL BODY
        // --------------------------------------------------

        const { email, password } = req.body;


        // --------------------------------------------------
        // VALIDACIONES
        // --------------------------------------------------

        if (!email || !password) {
            return res.status(400).json({
                status: "error",
                message: "Email y contraseña son obligatorios",
                data: null
            });
        }

        const emailRegex = /\S+@\S+\.\S+/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                status: "error",
                message: "Formato de email inválido",
                data: null
            });
        }


        // --------------------------------------------------
        // LLAMAR AL SERVICE
        // --------------------------------------------------

        const result = await authService.login({
            email: email.toLowerCase().trim(),
            password
        });


        // --------------------------------------------------
        // RESPUESTA EXITOSA
        // --------------------------------------------------

        return res.status(200).json({
            status: "success",
            message: "Login exitoso",
            data: result
        });

    } catch (error) {

        console.error("ERROR LOGIN:", error);


        // Error controlado
        if (error.statusCode) {
            return res.status(error.statusCode).json({
                status: "error",
                message: error.message,
                data: null
            });
        }

        // Error general
        return res.status(500).json({
            status: "error",
            message: "Error interno en login",
            data: null
        });
    }
};


// ------------------------------------------------------
// EXPORTAR CONTROLADORES (🔥 FIX CLAVE)
// ------------------------------------------------------

module.exports = {
    register, // 🔥 ahora sí existe
    login
};