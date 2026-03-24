// Importamos bcrypt para encriptar y comparar contraseñas
const bcrypt = require("bcryptjs");

// Importamos jsonwebtoken para generar tokens
const jwt = require("jsonwebtoken");

// Importamos repository (acceso a DB)
const userRepository = require("../repositories/user.repository");


// ------------------------------------------------------
// REGISTER
// ------------------------------------------------------

const register = async ({ nombre, email, telefono, password, rol }) => {

    // Limpiamos email (minúsculas y sin espacios)
    const emailNormalizado = email?.trim().toLowerCase();

    // Limpiamos contraseña
    const passwordLimpia = password?.trim();

    // Validamos campos obligatorios
    if (!nombre || !emailNormalizado || !telefono || !passwordLimpia || !rol) {
        throw new Error("Todos los campos son obligatorios");
    }

    // Buscamos si ya existe usuario
    const existingUser = await userRepository.findUserByEmail(emailNormalizado);

    // Si existe → error
    if (existingUser) {
        throw new Error("El usuario ya existe");
    }

    // 🔥 Encriptamos contraseña (ÚNICO LUGAR donde se hace)
    const hashedPassword = await bcrypt.hash(passwordLimpia, 10);

    // Creamos usuario en DB
    const newUser = await userRepository.createUser({
        nombre,
        email: emailNormalizado,
        telefono,
        password: hashedPassword,
        rol
    });

    // Retornamos datos sin password
    return {
        id: newUser.id,
        email: newUser.email,
        rol: newUser.rol
    };
};


// ------------------------------------------------------
// LOGIN
// ------------------------------------------------------

const login = async ({ email, password }) => {

    // Normalizamos email
    const emailNormalizado = email?.trim().toLowerCase();

    // Limpiamos password
    const passwordLimpia = password?.trim();

    // Buscamos usuario en DB
    const user = await userRepository.findUserByEmail(emailNormalizado);

    // Si no existe → error
    if (!user) throw new Error("Usuario no encontrado");

    // Comparamos password ingresada vs hash en DB
    const isMatch = await bcrypt.compare(passwordLimpia, user.password);

    // Si no coincide → error
    if (!isMatch) throw new Error("Contraseña incorrecta");

    // Creamos payload del token
    const payload = {
        id: user.id,
        rol: user.rol
    };

    // Generamos token JWT
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Retornamos token + usuario
    return {
        token,
        user
    };
};


// Exportamos funciones
module.exports = {
    register,
    login
};