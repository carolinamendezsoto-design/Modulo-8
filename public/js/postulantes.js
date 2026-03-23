// --------------------------------------------------
// OBTENER TOKEN
// --------------------------------------------------

// Recuperamos el token guardado en el navegador
const token = localStorage.getItem("token");

// Si no existe token
if (!token) {

    // Redirigimos al login
    window.location.href = "index.html";
}


// --------------------------------------------------
// FUNCIÓN PARA CARGAR POSTULANTES
// --------------------------------------------------

// Definimos función async
async function cargarPostulantes() {

    try {

        // --------------------------------------------------
        // PETICIÓN AL BACKEND
        // --------------------------------------------------

        const res = await fetch("/api/solicitudes", {

            // Enviamos token para autenticación
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        // Si el token es inválido
        if (res.status === 401) {

            // Limpiamos sesión
            localStorage.clear();

            // Redirigimos al login
            window.location.href = "index.html";

            return;
        }

        // Convertimos respuesta a JSON
        const data = await res.json();

        // Si ocurre error
        if (!res.ok) {

            // Lanzamos error
            throw new Error(data.message || "Error al cargar postulaciones");
        }

        // --------------------------------------------------
        // OBTENER CONTENEDOR HTML
        // --------------------------------------------------

        const contenedor = document.getElementById("listaPostulantes");

        // Si no existe el contenedor
        if (!contenedor) return;

        // Limpiamos contenido previo
        contenedor.innerHTML = "";

        // --------------------------------------------------
        // NORMALIZAR RESPUESTA
        // --------------------------------------------------

        // Algunos backends envían data.data, otros solo data
        const postulaciones = data.data || data;

        // Si no hay datos
        if (!postulaciones.length) {

            // Mostramos mensaje
            contenedor.innerHTML = "<p>No hay postulaciones</p>";

            return;
        }

        // --------------------------------------------------
        // RECORRER POSTULACIONES
        // --------------------------------------------------

        postulaciones.forEach(p => {

            // Creamos contenedor
            const div = document.createElement("div");

            // Asignamos clases
            div.className = "card mb-3 p-3";

            // Insertamos contenido dinámico
            div.innerHTML = `
                <h5>🐶 ${p.mascota?.nombre || "Sin nombre"}</h5>
                <p>👤 ${p.usuario?.nombre || "Desconocido"}</p>
                <p>Estado: <strong>${p.estado}</strong></p>
            `;

            // Insertamos en el DOM
            contenedor.appendChild(div);
        });

    } catch (error) {

        // Mostramos error en consola
        console.error("ERROR POSTULANTES:", error);

        // Mostramos mensaje al usuario
        mostrarMensaje(error.message, "danger");
    }
}


// --------------------------------------------------
// AUTO EJECUCIÓN
// --------------------------------------------------

// Ejecutamos la función cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", cargarPostulantes);