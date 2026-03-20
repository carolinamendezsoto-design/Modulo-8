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
    // VALIDACIÓN DE DATOS
    // --------------------------------------------------

    if (!email || !password) {
        const error = new Error("Email y contraseña son obligatorios");
        error.statusCode = 400;
        throw error;
    }


    // --------------------------------------------------
    // BUSCAR USUARIO EN LA BASE DE DATOS
    // --------------------------------------------------

    const user = await User.findOne({ where: { email } });

    if (!user) {
        const error = new Error("Usuario no encontrado");
        error.statusCode = 404;
        throw error;
    }


    // --------------------------------------------------
    // VALIDAR CONTRASEÑA
    // --------------------------------------------------

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        const error = new Error("Contraseña incorrecta");
        error.statusCode = 401;
        throw error;
    }


    // --------------------------------------------------
    // GENERAR TOKEN JWT (CORREGIDO 🔥)
    // --------------------------------------------------

    const payload = {

        // ID del usuario
        id: user.id,

        // Email
        email: user.email,

        // 🔥 CLAVE: ROL DEL USUARIO
        rol: user.rol
    };


    const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );


    // --------------------------------------------------
    // RESPUESTA FINAL (PRO)
    // --------------------------------------------------

    return {
        token, // el controller lo envuelve
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