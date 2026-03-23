// --------------------------------------------------
// FUNCIÓN PARA MOSTRAR MENSAJES PRO
// --------------------------------------------------

function mostrarMensaje(mensaje, tipo = "success") {

    // Eliminamos alerta previa (evita acumulación)
    const anterior = document.querySelector(".alert");
    if (anterior) anterior.remove();

    // Creamos alerta
    const alerta = document.createElement("div");

    // Clases bootstrap
    alerta.className = `alert alert-${tipo} text-center position-fixed top-0 start-50 translate-middle-x mt-3 shadow`;

    // Mensaje
    alerta.textContent = mensaje;

    // Insertamos en body
    document.body.appendChild(alerta);

    // Eliminamos automáticamente
    setTimeout(() => {
        alerta.remove();
    }, 3000);
}