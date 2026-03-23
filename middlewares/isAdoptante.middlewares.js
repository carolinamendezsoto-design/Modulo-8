// ------------------------------------------------------
// IMPORTAR MIDDLEWARE GENÉRICO
// ------------------------------------------------------

const authorizeRoles = require("./authorizeRoles");


// ------------------------------------------------------
// MIDDLEWARE: SOLO ADOPTANTE
// ------------------------------------------------------

const isAdoptante = authorizeRoles("adoptante");


// ------------------------------------------------------
// EXPORTAR
// ------------------------------------------------------

module.exports = isAdoptante;