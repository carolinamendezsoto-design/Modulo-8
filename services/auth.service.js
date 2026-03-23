// ------------------------------------------------------
// IMPORTAR DEPENDENCIAS
// ------------------------------------------------------

// Librería para encriptar y comparar contraseñas
const bcrypt = require("bcryptjs");

// Librería para generar tokens JWT
const jwt = require("jsonwebtoken");

// Importamos repository (arquitectura limpia)
const userRepository = require("../repositories/user.repository");


// ------------------------------------------------------
// FUNCIÓN REGISTER (🔥 NUEVA)
// ------------------------------------------------------

// Función para registrar un nuevo usuario
const register = async ({ nombre, email, telefono, password, rol }) => {

    // --------------------------------------------------
    // NORMALIZAR DATOS
    // --------------------------------------------------

    // Limpiamos y normalizamos email
    const emailNormalizado = email?.trim().toLowerCase();

    // Limpiamos nombre
    const nombreLimpio = nombre?.trim();

    // Limpiamos teléfono
    const telefonoLimpio = telefono?.trim();

    // Limpiamos password
    const passwordLimpia = password?.trim();

    // DEBUG
    console.log("📩 Registrando usuario:", emailNormalizado);


    // --------------------------------------------------
    // VALIDACIONES
    // --------------------------------------------------

    // Validamos campos obligatorios
    if (!nombreLimpio || !emailNormalizado || !telefonoLimpio || !passwordLimpia || !rol) {

        const error = new Error("Todos los campos son obligatorios");
        error.statusCode = 400;
        throw error;
    }


    // --------------------------------------------------
    // VERIFICAR SI USUARIO YA EXISTE
    // --------------------------------------------------

    // Buscamos usuario por email
    const existingUser = await userRepository.findUserByEmail(emailNormalizado);

    if (existingUser) {

        const error = new Error("El usuario ya está registrado");
        error.statusCode = 400;
        throw error;
    }


    // --------------------------------------------------
    // ENCRIPTAR PASSWORD
    // --------------------------------------------------

    // Generamos hash seguro
    const hashedPassword = await bcrypt.hash(passwordLimpia, 10);


    // --------------------------------------------------
    // CREAR USUARIO EN BD
    // --------------------------------------------------

    // Usamos repository (arquitectura limpia)
    const newUser = await userRepository.createUser({
        nombre: nombreLimpio,
        email: emailNormalizado,
        telefono: telefonoLimpio,
        password: hashedPassword,
        rol
    });

    // DEBUG
    console.log("✅ Usuario creado:", newUser.email);


    // --------------------------------------------------
    // RESPUESTA (SIN PASSWORD)
    // --------------------------------------------------

    return {
        id: newUser.id,
        nombre: newUser.nombre,
        email: newUser.email,
        rol: newUser.rol
    };
};



// ------------------------------------------------------
// FUNCIÓN LOGIN
// ------------------------------------------------------

const login = async ({ email, password }) => {

    // --------------------------------------------------
    // NORMALIZAR DATOS
    // --------------------------------------------------

    const emailNormalizado = email?.trim().toLowerCase();
    const passwordLimpia = password?.trim();

    console.log("📩 Email recibido:", emailNormalizado);


    // --------------------------------------------------
    // VALIDACIÓN
    // --------------------------------------------------

    if (!emailNormalizado || !passwordLimpia) {

        const error = new Error("Email y contraseña son obligatorios");
        error.statusCode = 400;
        throw error;
    }


    // --------------------------------------------------
    // BUSCAR USUARIO
    // --------------------------------------------------

    const user = await userRepository.findUserByEmail(emailNormalizado);

    console.log("👀 Usuario encontrado:", user ? user.email : null);


    // --------------------------------------------------
    // VALIDAR EXISTENCIA
    // --------------------------------------------------

    if (!user) {

        const error = new Error("Usuario no encontrado");
        error.statusCode = 404;
        throw error;
    }


    // --------------------------------------------------
    // VALIDAR PASSWORD
    // --------------------------------------------------

    const isMatch = await bcrypt.compare(passwordLimpia, user.password);

    if (!isMatch) {

        const error = new Error("Contraseña incorrecta");
        error.statusCode = 401;
        throw error;
    }


    // --------------------------------------------------
    // GENERAR TOKEN JWT
    // --------------------------------------------------

    const payload = {
        id: user.id,
        email: user.email,
        rol: user.rol
    };

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
// EXPORTAR (🔥 FIX CLAVE)
// ------------------------------------------------------

module.exports = {
    register, // 🔥 ahora existe → soluciona tu 500
    login
};