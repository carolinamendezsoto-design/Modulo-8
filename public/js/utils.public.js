// --------------------------------------------------
// FUNCIÓN PARA MOSTRAR MENSAJES EN PANTALLA
// --------------------------------------------------

// Definimos función reutilizable para mostrar alertas al usuario
function mostrarMensaje(mensaje, tipo = "success") {

    // --------------------------------------------------
    // CREAR ELEMENTO HTML
    // --------------------------------------------------

    // Creamos un elemento <div> en memoria (no visible aún)
    const alerta = document.createElement("div");

    // --------------------------------------------------
    // ASIGNAR CLASES
    // --------------------------------------------------

    // Asignamos clases de Bootstrap dinámicamente según el tipo de mensaje
    // Ejemplo: alert-success, alert-danger, alert-warning, etc.
    alerta.className = `alert alert-${tipo} mt-2`;

    // --------------------------------------------------
    // AGREGAR CONTENIDO
    // --------------------------------------------------

    // Insertamos el mensaje de texto dentro del div
    alerta.textContent = mensaje;

    // --------------------------------------------------
    // INSERTAR EN EL DOM
    // --------------------------------------------------

    // Insertamos la alerta al inicio del body (arriba de todo)
    // prepend la agrega antes de cualquier otro elemento
    document.body.prepend(alerta);

    // --------------------------------------------------
    // AUTO ELIMINACIÓN
    // --------------------------------------------------

    // Usamos setTimeout para eliminar la alerta después de 3 segundos
    setTimeout(() => {

        // Eliminamos el elemento del DOM
        alerta.remove();

    }, 3000); // 3000 ms = 3 segundos
}