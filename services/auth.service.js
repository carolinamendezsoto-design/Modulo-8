// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

// Librería para comparar contraseñas encriptadas (bcrypt)
const bcrypt = require("bcryptjs");

// Librería para generar tokens JWT
const jwt = require("jsonwebtoken");

// Importamos repository (🔥 NO usamos modelo directo → arquitectura limpia)
const userRepository = require("../repositories/user.repository");


// ------------------------------------------------------
// FUNCIÓN LOGIN
// ------------------------------------------------------

// Función principal para autenticación de usuario
// Recibe email y password desde controller
const login = async ({ email, password }) => {

    // --------------------------------------------------
    // NORMALIZAR DATOS
    // --------------------------------------------------

    // Eliminamos espacios y convertimos email a minúsculas
    // Esto evita errores por mayúsculas o espacios accidentales
    const emailNormalizado = email?.trim().toLowerCase();

    // Limpiamos password eliminando espacios innecesarios
    const passwordLimpia = password?.trim();


    // --------------------------------------------------
    // VALIDACIÓN DE INPUT
    // --------------------------------------------------

    // Verificamos que ambos campos existan
    if (!emailNormalizado || !passwordLimpia) {

        // Creamos error controlado
        const error = new Error("Email y contraseña son obligatorios");

        // Asignamos status HTTP
        error.statusCode = 400;

        // Lanzamos error al middleware global
        throw error;
    }


    // --------------------------------------------------
    // BUSCAR USUARIO EN BASE DE DATOS
    // --------------------------------------------------

    // 🔥 CORRECCIÓN IMPORTANTE:
    // Antes se usaba findAllUsers (incorrecto para login)
    // Ahora usamos una función específica → findUserByEmail

    const user = await userRepository.findUserByEmail(emailNormalizado);


    // --------------------------------------------------
    // VALIDAR EXISTENCIA DE USUARIO
    // --------------------------------------------------

    // Si no encontramos usuario con ese email
    if (!user) {

        const error = new Error("Usuario no encontrado");

        error.statusCode = 404;

        throw error;
    }


    // --------------------------------------------------
    // VALIDAR PASSWORD
    // --------------------------------------------------

    // Comparamos password ingresada con el hash almacenado
    const isMatch = await bcrypt.compare(passwordLimpia, user.password);

    // Si no coincide → error de autenticación
    if (!isMatch) {

        const error = new Error("Contraseña incorrecta");

        error.statusCode = 401;

        throw error;
    }


    // --------------------------------------------------
    // GENERAR TOKEN JWT
    // --------------------------------------------------

    // Creamos payload con información relevante del usuario
    const payload = {
        id: user.id,         // ID del usuario
        email: user.email,   // Email
        rol: user.rol        // Rol (admin, adoptante, etc.)
    };

    // Generamos token firmado con clave secreta
    const token = jwt.sign(
        payload,                    // datos
        process.env.JWT_SECRET,     // clave secreta
        { expiresIn: "1h" }         // expiración
    );


    // --------------------------------------------------
    // RESPUESTA FINAL
    // --------------------------------------------------

    // Retornamos token + info del usuario (sin password)
    return {
        token,
        user: {
            id: user.id,
            email: user.email,
            rol: user.rol
        }
    };
};


// ------------------------------------------------------
// EXPORTAR FUNCIONES
// ------------------------------------------------------

// Exportamos login para usarlo en controller
module.exports = {
    login
};