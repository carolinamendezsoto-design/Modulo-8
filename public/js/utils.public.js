// --------------------------------------------------
// FUNCIÓN PARA MOSTRAR MENSAJES EN PANTALLA
// --------------------------------------------------

// Definimos función reutilizable para mostrar alertas
function mostrarMensaje(mensaje, tipo = "success") {

    // Creamos un elemento <div> en memoria
    const alerta = document.createElement("div");

    // Le asignamos clases de Bootstrap dinámicamente según el tipo
    alerta.className = `alert alert-${tipo} mt-2`;

    // Insertamos el texto dentro del div
    alerta.textContent = mensaje;

    // Insertamos la alerta al inicio del body (arriba de todo)
    document.body.prepend(alerta);

    // Eliminamos automáticamente la alerta después de 3 segundos
    setTimeout(() => {
        alerta.remove(); // elimina el elemento del DOM
    }, 3000);
}