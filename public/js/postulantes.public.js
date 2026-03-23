// --------------------------------------------------
// FUNCIÓN PARA CARGAR POSTULANTES
// --------------------------------------------------

// Función async para obtener postulaciones desde el backend
async function cargarPostulantes() {

    // --------------------------------------------------
    // OBTENER TOKEN
    // --------------------------------------------------

    // Recuperamos el token desde localStorage
    const token = localStorage.getItem("token");

    // Si no hay token → usuario no autenticado
    if (!token) {

        // Mostramos mensaje
        mostrarMensaje("No autorizado", "danger");

        // Redirigimos al login
        window.location.href = "index.html";

        return;
    }

    try {

        // --------------------------------------------------
        // PETICIÓN AL BACKEND
        // --------------------------------------------------

        // Hacemos request GET para obtener postulaciones
        const res = await fetch("/api/solicitudes", {

            // Enviamos headers con token
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        // Convertimos respuesta a JSON
        const data = await res.json();

        // Si hay error
        if (!res.ok) {

            mostrarMensaje(data.message || "Error al cargar postulantes", "danger");

            return;
        }

        // --------------------------------------------------
        // CONTENEDOR HTML
        // --------------------------------------------------

        // Obtenemos contenedor donde mostrar postulantes
        const contenedor = document.getElementById("listaPostulantes");

        // Si no existe → evitar error
        if (!contenedor) return;

        // Limpiamos contenido previo
        contenedor.innerHTML = "";

        // Si no hay postulaciones
        if (!data.data.length) {

            contenedor.innerHTML = "<p>No hay postulaciones</p>";

            return;
        }

        // --------------------------------------------------
        // RECORRER POSTULACIONES
        // --------------------------------------------------

        data.data.forEach(postulacion => {

            // Creamos contenedor div
            const div = document.createElement("div");

            // Clases Bootstrap
            div.className = "card mb-3 p-3";

            // Insertamos contenido dinámico
            div.innerHTML = `
                <h5>🐶 Mascota: ${postulacion.mascota?.nombre || "Sin nombre"}</h5>

                <p>👤 Usuario: ${postulacion.usuario?.nombre || "Desconocido"}</p>

                <p>📌 Estado: 
                    <strong>${postulacion.estado}</strong>
                </p>

                <div class="d-flex gap-2">

                    <button 
                        class="btn btn-success btn-sm"
                        onclick="aprobarSolicitud(${postulacion.id})"
                    >
                        Aprobar
                    </button>

                    <button 
                        class="btn btn-danger btn-sm"
                        onclick="rechazarSolicitud(${postulacion.id})"
                    >
                        Rechazar
                    </button>

                </div>
            `;

            // Insertamos en el DOM
            contenedor.appendChild(div);
        });

    } catch (error) {

        // Error en consola
        console.error(error);

        // Mensaje al usuario
        mostrarMensaje("Error al cargar postulantes", "danger");
    }
}


// --------------------------------------------------
// APROBAR SOLICITUD
// --------------------------------------------------

// Función para aprobar adopción
async function aprobarSolicitud(id) {

    // Obtenemos token
    const token = localStorage.getItem("token");

    try {

        // Enviamos petición PUT
        const res = await fetch(`/api/solicitudes/${id}/aprobar`, {

            method: "PUT",

            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const data = await res.json();

        if (!res.ok) {

            mostrarMensaje(data.message || "Error al aprobar", "danger");

            return;
        }

        mostrarMensaje("Solicitud aprobada");

        // Recargamos lista
        cargarPostulantes();

    } catch (error) {

        console.error(error);

        mostrarMensaje("Error al aprobar", "danger");
    }
}


// --------------------------------------------------
// RECHAZAR SOLICITUD
// --------------------------------------------------

// Función para rechazar adopción
async function rechazarSolicitud(id) {

    const token = localStorage.getItem("token");

    try {

        const res = await fetch(`/api/solicitudes/${id}/rechazar`, {

            method: "PUT",

            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const data = await res.json();

        if (!res.ok) {

            mostrarMensaje(data.message || "Error al rechazar", "danger");

            return;
        }

        mostrarMensaje("Solicitud rechazada");

        cargarPostulantes();

    } catch (error) {

        console.error(error);

        mostrarMensaje("Error al rechazar", "danger");
    }
}


// --------------------------------------------------
// AUTO CARGA
// --------------------------------------------------

// Ejecutamos automáticamente al cargar la página
cargarPostulantes();