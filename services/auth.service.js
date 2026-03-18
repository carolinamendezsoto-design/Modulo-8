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

// Definimos la función login como async (usa await)
// Recibe un objeto con email y password desde el controller
const login = async ({ email, password }) => {

    // --------------------------------------------------
    // VALIDACIÓN DE DATOS
    // --------------------------------------------------

    // Verificamos que email y password existan
    // Si faltan, creamos un error con código 400 (bad request)
    if (!email || !password) {
        const error = new Error("Email y contraseña son obligatorios"); // mensaje del error
        error.statusCode = 400; // código HTTP correcto
        throw error; // lanzamos el error
    }


    // --------------------------------------------------
    // BUSCAR USUARIO EN LA BASE DE DATOS
    // --------------------------------------------------

    // Buscamos un usuario por su email
    const user = await User.findOne({ where: { email } });

    // Si no existe el usuario, lanzamos error 404 (no encontrado)
    if (!user) {
        const error = new Error("Usuario no encontrado"); // mensaje
        error.statusCode = 404; // código HTTP
        throw error; // lanzamos el error
    }


    // --------------------------------------------------
    // VALIDAR CONTRASEÑA
    // --------------------------------------------------

    // Comparamos la contraseña ingresada con la almacenada (encriptada)
    const isMatch = await bcrypt.compare(password, user.password);

    // Si no coinciden, lanzamos error 401 (no autorizado)
    if (!isMatch) {
        const error = new Error("Contraseña incorrecta"); // mensaje
        error.statusCode = 401; // código HTTP
        throw error; // lanzamos error
    }


    // --------------------------------------------------
    // GENERAR TOKEN JWT
    // --------------------------------------------------

    // Creamos los datos que irán dentro del token
    const payload = {
        id: user.id,        // ID del usuario
        email: user.email  // email del usuario
    };

    // Generamos el token con la clave secreta
    const token = jwt.sign(
        payload,                    // datos del usuario
        process.env.JWT_SECRET,     // clave secreta desde .env
        { expiresIn: "1h" }         // duración del token
    );


    // --------------------------------------------------
    // RESPUESTA FINAL
    // --------------------------------------------------

    // Retornamos un objeto estructurado (esto lo envía el controller)
    return {
        status: "success",      // indica que todo salió bien
        message: "Login exitoso", // mensaje
        data: {
            token              // token generado
        }
    };
};


// ------------------------------------------------------
// EXPORTAR FUNCIÓN
// ------------------------------------------------------

// Exportamos la función para usarla en el controller
module.exports = {
    login
};