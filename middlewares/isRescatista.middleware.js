// ------------------------------------------------------
// IMPORTAR MIDDLEWARE GENÉRICO
// ------------------------------------------------------

const authorizeRoles = require("./authorizeRoles.middleware");


// ------------------------------------------------------
// MIDDLEWARE: SOLO RESCATISTA
// ------------------------------------------------------

const isRescatista = authorizeRoles("rescatista");


// ------------------------------------------------------
// EXPORTAR
// ------------------------------------------------------

module.exports = isRescatista;