// ------------------------------------------------------
// IMPORTAR MIDDLEWARE GENÉRICO
// ------------------------------------------------------

const authorizeRoles = require("./authorizeRoles");


// ------------------------------------------------------
// MIDDLEWARE: SOLO RESCATISTA
// ------------------------------------------------------

const isRescatista = authorizeRoles("rescatista");


// ------------------------------------------------------
// EXPORTAR
// ------------------------------------------------------

module.exports = isRescatista;