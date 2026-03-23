// ------------------------------------------------------
// IMPORTAR MIDDLEWARE GENÉRICO
// ------------------------------------------------------

const authorizeRoles = require("./authorizeRoles");


// ------------------------------------------------------
// MIDDLEWARE: SOLO ADMIN
// ------------------------------------------------------

// Creamos middleware específico para admin
const isAdmin = authorizeRoles("admin");


// ------------------------------------------------------
// EXPORTAR
// ------------------------------------------------------

module.exports = isAdmin;