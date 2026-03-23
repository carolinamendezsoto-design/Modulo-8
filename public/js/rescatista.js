// --------------------------------------------------
// OBTENER TOKEN
// --------------------------------------------------

// Recuperamos el token desde localStorage
const token = localStorage.getItem("token");

// Si no existe token
if (!token) {

    // Redirigimos al login
    window.location.href = "index.html";
}


// --------------------------------------------------
// FUNCIÓN PARA CARGAR MASCOTAS
// --------------------------------------------------

// Función async
async function cargarMisMascotas() {

    try {

        // --------------------------------------------------
        // PETICIÓN AL BACKEND
        // --------------------------------------------------

        const res = await fetch("/api/mascotas/mis-mascotas", {

            // Enviamos token
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        // Si el token no es válido
        if (res.status === 401) {

            // Limpiamos sesión
            localStorage.clear();

            // Redirigimos
            window.location.href = "index.html";

            return;
        }

        // Convertimos a JSON
        const data = await res.json();

        // Si hay error
        if (!res.ok) {

            throw new Error(data.message || "Error al cargar mascotas");
        }

        // --------------------------------------------------
        // CONTENEDOR HTML
        // --------------------------------------------------

        const contenedor = document.getElementById("listaMascotas");

        // Validamos existencia
        if (!contenedor) return;

        // Limpiamos contenido
        contenedor.innerHTML = "";

        // Normalizamos respuesta
        const mascotas = data.data || data;

        // Si no hay mascotas
        if (!mascotas.length) {

            contenedor.innerHTML = "<p>No tienes mascotas registradas</p>";

            return;
        }

        // --------------------------------------------------
        // RECORRER MASCOTAS
        // --------------------------------------------------

        mascotas.forEach(m => {

            const div = document.createElement("div");

            div.className = "card mb-3 p-3";

            div.innerHTML = `
                <h5>${m.nombre}</h5>
                <p>${m.descripcion || "Sin descripción"}</p>
                <p>Estado: <strong>${m.estado}</strong></p>
            `;

            contenedor.appendChild(div);
        });

    } catch (error) {

        console.error("ERROR RESCATISTA:", error);

        mostrarMensaje(error.message, "danger");
    }
}


// --------------------------------------------------
// AUTO EJECUCIÓN
// --------------------------------------------------

// Ejecutamos cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", cargarMisMascotas);