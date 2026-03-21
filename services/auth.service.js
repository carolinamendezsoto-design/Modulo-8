// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

// Importamos bcrypt para comparar contraseñas encriptadas
const bcrypt = require("bcryptjs");

// Importamos jsonwebtoken para generar tokens JWT
const jwt = require("jsonwebtoken");

// Importamos el modelo User para consultar la base de datos
const User = require("../models/user");


// ------------------------------------------------------
// FUNCIÓN LOGIN
// ------------------------------------------------------

const login = async ({ email, password }) => {

    // --------------------------------------------------
    // NORMALIZAR DATOS (🔥 SOLUCIÓN CLAVE)
    // --------------------------------------------------

    // Eliminamos espacios y pasamos a minúsculas
    const emailNormalizado = email?.trim().toLowerCase();
    const passwordLimpia = password?.trim();

    // --------------------------------------------------
    // VALIDACIÓN DE DATOS
    // --------------------------------------------------

    // Verificamos que existan email y password
    if (!emailNormalizado || !passwordLimpia) {

        const error = new Error("Email y contraseña son obligatorios");
        error.statusCode = 400;

        throw error;
    }

    // --------------------------------------------------
    // DEBUG (puedes borrar después)
    // --------------------------------------------------

    console.log("🔍 Buscando usuario con email:", emailNormalizado);

    // --------------------------------------------------
    // BUSCAR USUARIO EN LA BASE DE DATOS
    // --------------------------------------------------

    // Buscamos usuario por email normalizado
    const user = await User.findOne({
        where: { email: emailNormalizado }
    });

    // Si no existe usuario
    if (!user) {

        const error = new Error("Usuario no encontrado");
        error.statusCode = 404;

        throw error;
    }

    // --------------------------------------------------
    // VALIDAR CONTRASEÑA
    // --------------------------------------------------

    // Comparamos password ingresada con la encriptada en DB
    const isMatch = await bcrypt.compare(passwordLimpia, user.password);

    // Si no coincide
    if (!isMatch) {

        const error = new Error("Contraseña incorrecta");
        error.statusCode = 401;

        throw error;
    }

    // --------------------------------------------------
    // GENERAR TOKEN JWT
    // --------------------------------------------------

    // Creamos payload con datos del usuario
    const payload = {

        id: user.id,       // ID usuario
        email: user.email, // email
        rol: user.rol      // 🔥 rol (clave para tu sistema)
    };

    // Firmamos el token con secreto del .env
    const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "1h" } // expira en 1 hora
    );

    // --------------------------------------------------
    // RESPUESTA FINAL
    // --------------------------------------------------

    return {

        token, // token JWT

        user: {
            id: user.id,
            email: user.email,
            rol: user.rol
        }
    };
};


// ------------------------------------------------------
// EXPORTAR FUNCIÓN
// ------------------------------------------------------

module.exports = {
    login
};