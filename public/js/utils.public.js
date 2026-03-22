// --------------------------------------------------
// FUNCIÓN PARA MOSTRAR MENSAJES BONITOS
// --------------------------------------------------

function mostrarMensaje(mensaje, tipo = "success") {

    // Creamos un div
    const alerta = document.createElement("div");

    // Le agregamos clases de Bootstrap dinámicamente
    alerta.className = `alert alert-${tipo} mt-2`;

    // Le asignamos el texto
    alerta.textContent = mensaje;

    // Lo agregamos arriba del body
    document.body.prepend(alerta);

    // Lo eliminamos después de 3 segundos
    setTimeout(() => alerta.remove(), 3000);
}