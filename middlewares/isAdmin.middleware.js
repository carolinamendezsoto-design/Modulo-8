// ------------------------------------------------------
// IMPORTAR MIDDLEWARE GENÉRICO
// ------------------------------------------------------

const authorizeRoles = require("./authorizeRoles.middleware");


// ------------------------------------------------------
// MIDDLEWARE: SOLO ADMIN
// ------------------------------------------------------

// Creamos middleware específico para rol admin
const isAdmin = authorizeRoles("admin");


// ------------------------------------------------------
// EXPORTAR
// ------------------------------------------------------

module.exports = isAdmin;