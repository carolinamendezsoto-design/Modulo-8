// ------------------------------------------------------
// 🔐 OBTENER TOKEN Y USUARIO
// ------------------------------------------------------

// Recuperamos el token de acceso desde el almacenamiento local
const token = localStorage.getItem("token");

// Declaramos la variable del usuario que vamos a parsear
let user = null;

try {
    // Intentamos convertir el string del usuario guardado a objeto
    user = JSON.parse(localStorage.getItem("user"));
} catch {
    // Si falla, lo dejamos nulo por seguridad
    user = null;
}

// Obtenemos el rol del usuario limpiando espacios y pasándolo a minúsculas
const rol = user?.rol?.toLowerCase()?.trim();

// Verificamos si alguien intenta colarse sin ser rescatista
if (!token || !user || rol !== "rescatista") {
    
    // Si no está autorizado, lo devolvemos al inicio de inmediato
    window.location.href = "index.html";
}


// ------------------------------------------------------
// 🐶 FUNCIÓN PARA CARGAR MIS MASCOTAS
// ------------------------------------------------------

// Función asíncrona para consultar el listado de mascotas del rescatista
async function cargarMisMascotas() {

    // Identificamos el contenedor donde se dibujarán las mascotas
    const contenedor = document.getElementById("contenedorMascotas");

    // Si por alguna razón no existe el contenedor, abortamos
    if (!contenedor) return;

    try {

        // Petición hacia el backend para solicitar TODAS las mascotas
        const res = await fetch("/api/mascotas", {

            // Pasamos nuestra autorización para demostrar quiénes somos
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        // Si el token expiró o es inválido, cerramos todo
        if (res.status === 401) {

            // Borramos rastros de sesión
            localStorage.clear();
            // Redirigimos para proteger
            window.location.href = "index.html";
            return;
        }

        // Convertimos la respuesta del backend a objeto JSON
        const data = await res.json();

        // En caso de fallar, arrojamos un error para detenernos
        if (!res.ok) {
            throw new Error(data.message || "Hubo un problema al cargar mascotas");
        }

        // Limpiamos el contenedor por completo para evitar clonajes
        contenedor.innerHTML = "";

        // Mapeamos el arreglo (el backend devuelve { data: [...] } u ocasionalmente un arreglo directo)
        const mascotasBackend = data.data || data;

        // Filtramos para dejar solo las mascotas que nos pertenecen a nosotros
        const mascotas = mascotasBackend.filter(m => m.userId === user.id);

        // Validamos si nuestro arreglo quedó vacío
        if (!mascotas.length) {

            // Enviamos mensaje amistoso
            contenedor.innerHTML = "<p>No tienes mascotas registradas 🐶</p>";
            return;
        }

        // Si tenemos mascotas, las recorremos una por una
        mascotas.forEach(m => {

            // Construimos la ruta de la imagen o asignamos una por defecto
            const imagenUrl = m.imagen ? `http://localhost:3000/uploads/${m.imagen}` : "img/default.jpg";

            // Creamos un nuevo divisor
            const div = document.createElement("div");

            // Añadimos las clases de Bootstrap para cuadrícula
            div.className = "col-md-4 mb-4";

            // Armamos el HTML con diseño glassmorphism y etiquetas coloridas
            div.innerHTML = `
                <div class="card p-3 text-white h-100 d-flex flex-column">

                    <!-- Fotografía de la mascota -->
                    <img src="${imagenUrl}" alt="${m.nombre}" class="img-fluid rounded mb-3" style="height: 200px; object-fit: cover; border-radius: 15px;">

                    <!-- Nombre de la mascota -->
                    <h4 class="fw-bold">${m.nombre}</h4>

                    <!-- Etiquetas informativas rápidas -->
                    <div class="mb-3">
                        <span class="badge bg-primary me-1">${m.raza || "No definida"}</span>
                        <span class="badge bg-info text-dark me-1">${m.edad}</span>
                        <span class="badge ${m.estado === 'disponible' ? 'bg-success' : 'bg-secondary'}">
                            ${m.estado.toUpperCase()}
                        </span>
                    </div>

                    <!-- Contenido descriptivo secundario -->
                    <p class="flex-grow-1">${m.descripcion || "Sin descripción."}</p>

                    <!-- Botón para chequear los postulantes -->
                    <button class="btn btn-primary w-100 fw-bold mt-auto" onclick="verPostulantes(${m.id})">
                        Ver postulantes
                    </button>

                </div>
            `;

            // Insertamos la tarjeta final al contenedor visible
            contenedor.appendChild(div);
        });

    } catch (error) {

        // Escribimos en consola los detalles del error para el programador
        console.error("Error al cargar rescatista:", error);

        // Usamos la función global para notificar al rescatista de la falla
        mostrarMensaje(error.message, "danger");
    }
}


// ------------------------------------------------------
// 🔔 CARGAR NOTIFICACIONES
// ------------------------------------------------------

async function cargarNotificaciones() {
    try {
        const res = await fetch("http://localhost:3000/api/notificaciones", {
            headers: { Authorization: "Bearer " + token }
        });
        const data = await res.json();
        const noLeidas = (data.data || []).filter(n => !n.leido);
        const contador = document.getElementById("contadorNoti");
        const campana = document.getElementById("campana");

        if (noLeidas.length > 0) {
            contador.style.display = "inline-block";
            contador.textContent = noLeidas.length;
            campana.classList.add("campana-activa");
        } else {
            contador.style.display = "none";
            campana.classList.remove("campana-activa");
        }
    } catch (error) {
        console.error("Error notificaciones:", error);
    }
}

function irNotificaciones() {
    window.location.href = "notificaciones.html";
}

// ------------------------------------------------------
// 🔁 REDIRECCIÓN POSTULANTES
// ------------------------------------------------------

// Transfiere al usuario a la vista detallada de los postulantes de un animal
function verPostulantes(id) {
    
    // Cambiamos a la nueva pantalla indicando el ID mediante la URL
    window.location.href = "postulantes.html?id=" + id;
}


// ------------------------------------------------------
// 🚀 INICIALIZACIÓN AUTOMÁTICA
// ------------------------------------------------------

// Nos aseguramos de que esto corra apenas el esqueleto web esté listo
document.addEventListener("DOMContentLoaded", () => {
    
    // Buscamos la etiqueta destinada para el nombre en la vista web
    const etiquetaUsuario = document.getElementById("nombreUsuario");
    
    // Validamos que tengamos al usuario y la etiqueta en el HTML
    if (user && user.nombre && etiquetaUsuario) {
        // Le inyectamos visualmente el nombre del rescatista logueado
        etiquetaUsuario.textContent = "👤 " + user.nombre;
    }

    cargarMisMascotas();
    cargarNotificaciones(); // Cargamos campana activa
});

// Hacemos global la función para que funcione el 'onclick' en el HTML
window.verPostulantes = verPostulantes;
window.irNotificaciones = irNotificaciones;