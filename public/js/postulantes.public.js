// ------------------------------------------------------
// CONFIGURACIÓN
// ------------------------------------------------------

// URL base de tu backend
const API = "http://localhost:3000/api";

// Obtenemos el token guardado en el navegador (login previo)
const token = localStorage.getItem("token");

// ID de la mascota (puedes hacerlo dinámico después)
const mascotaId = 1;


// ------------------------------------------------------
// FUNCIÓN: CARGAR POSTULANTES
// ------------------------------------------------------

// Función async para obtener solicitudes desde el backend
async function cargarPostulantes() {
    try {

        // Hacemos petición GET al backend
        const res = await fetch(`${API}/solicitudes/mascota/${mascotaId}`, {

            // Enviamos token en headers (autenticación)
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        // Convertimos respuesta a JSON
        const data = await res.json();

        // Obtenemos el contenedor del HTML
        const container = document.getElementById("lista-postulantes");

        // Limpiamos contenido anterior
        container.innerHTML = "";

        // Recorremos cada solicitud recibida
        data.data.forEach(solicitud => {

            // Creamos un div por cada postulante
            const div = document.createElement("div");

            // Insertamos contenido dinámico
            div.innerHTML = `
                <h3>${solicitud.adoptante.nombre}</h3> <!-- Nombre usuario -->
                <p>Email: ${solicitud.adoptante.email}</p> <!-- Email -->
                <p>Mensaje: ${solicitud.mensaje || "Sin mensaje"}</p> <!-- Mensaje -->
                <p>Estado: ${solicitud.estado}</p> <!-- Estado -->

                <!-- Botón para seleccionar adoptante -->
                <button onclick="seleccionar(${solicitud.id})">
                    Seleccionar adoptante
                </button>

                <hr> <!-- Separador -->
            `;

            // Agregamos el div al contenedor
            container.appendChild(div);
        });

    } catch (error) {

        // Mostramos error en consola
        console.error("Error al cargar postulantes:", error);
    }
}


// ------------------------------------------------------
// FUNCIÓN: SELECCIONAR ADOPTANTE
// ------------------------------------------------------

// Función que se ejecuta al hacer click en el botón
async function seleccionar(id) {
    try {

        // Hacemos petición PUT al backend
        const res = await fetch(`${API}/solicitudes/seleccionar/${id}`, {

            // Método PUT
            method: "PUT",

            // Enviamos token
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        // Convertimos respuesta a JSON
        const data = await res.json();

        // Mostramos mensaje al usuario
        alert(data.message);

        // Volvemos a cargar lista actualizada
        cargarPostulantes();

    } catch (error) {

        // Error en consola
        console.error("Error al seleccionar adoptante:", error);
    }
}


// ------------------------------------------------------
// INICIO
// ------------------------------------------------------

// Ejecutamos función al cargar la página
cargarPostulantes();