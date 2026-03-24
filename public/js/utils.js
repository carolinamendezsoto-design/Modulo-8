// --------------------------------------------------
// 🔔 FUNCIÓN PARA MOSTRAR MENSAJES (UX PRO)
// --------------------------------------------------

function mostrarMensaje(mensaje, tipo = "success") {

    // Eliminamos alerta previa (evita duplicados)
    const anterior = document.querySelector(".alert");
    if (anterior) anterior.remove(); // si existe → la borramos

    // Creamos contenedor
    const alerta = document.createElement("div");

    // Clases bootstrap dinámicas
    alerta.className = `
        alert alert-${tipo} 
        text-center 
        position-fixed 
        top-0 
        start-50 
        translate-middle-x 
        mt-3 
        shadow
    `;

    // Insertamos mensaje
    alerta.textContent = mensaje;

    // Agregamos al DOM
    document.body.appendChild(alerta);

    // Auto eliminar después de 3 segundos
    setTimeout(() => {
        alerta.remove();
    }, 3000);
}


// --------------------------------------------------
// 🌍 HACER GLOBAL (CLAVE)
// --------------------------------------------------

// Permite usar mostrarMensaje desde cualquier HTML
window.mostrarMensaje = mostrarMensaje;