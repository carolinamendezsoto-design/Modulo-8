// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

// Librería para comparar contraseñas encriptadas
const bcrypt = require("bcryptjs");

// Librería para generar tokens JWT
const jwt = require("jsonwebtoken");

// Importamos repository (🔥 NO modelo directo)
const userRepository = require("../repositories/user.repository");


// ------------------------------------------------------
// FUNCIÓN LOGIN
// ------------------------------------------------------

const login = async ({ email, password }) => {

    // --------------------------------------------------
    // NORMALIZAR DATOS
    // --------------------------------------------------

    // Eliminamos espacios y pasamos email a minúsculas
    const emailNormalizado = email?.trim().toLowerCase();

    // Limpiamos password
    const passwordLimpia = password?.trim();


    // --------------------------------------------------
    // VALIDACIÓN
    // --------------------------------------------------

    // Verificamos que existan ambos campos
    if (!emailNormalizado || !passwordLimpia) {

        const error = new Error("Email y contraseña son obligatorios");
        error.statusCode = 400;

        throw error;
    }


    // --------------------------------------------------
    // BUSCAR USUARIO
    // --------------------------------------------------

    // Buscamos usuario usando repository
    const usuarios = await userRepository.findAllUsers({
        email: emailNormalizado
    });

    // Tomamos el primero (email debería ser único)
    const user = usuarios[0];

    // Si no existe usuario
    if (!user) {

        const error = new Error("Usuario no encontrado");
        error.statusCode = 404;

        throw error;
    }


    // --------------------------------------------------
    // VALIDAR PASSWORD
    // --------------------------------------------------

    // Comparamos password ingresada con hash
    const isMatch = await bcrypt.compare(passwordLimpia, user.password);

    if (!isMatch) {

        const error = new Error("Contraseña incorrecta");
        error.statusCode = 401;

        throw error;
    }


    // --------------------------------------------------
    // GENERAR TOKEN JWT
    // --------------------------------------------------

    // Creamos payload con info clave
    const payload = {
        id: user.id,
        email: user.email,
        rol: user.rol
    };

    // Firmamos token
    const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );


    // --------------------------------------------------
    // RESPUESTA FINAL
    // --------------------------------------------------

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
// EXPORTAR
// ------------------------------------------------------

module.exports = {
    login
};