// ===================== BASE URL =====================
// const API_URL = "http://localhost:3000/api"; // Comentado: Ya se declara en auth.js

// ===================== TOKEN =====================
const token = localStorage.getItem("token");

// ===================== USER =====================
let user = null;

try {
    user = JSON.parse(localStorage.getItem("user"));
} catch {
    user = null;
}

// ===================== VALIDACIÓN =====================
if (!token || !user) {
    mostrarMensaje("Debes iniciar sesión", "danger");
    setTimeout(() => window.location.href = "index.html", 800);
}

// ===================== PARAMS =====================
const params = new URLSearchParams(window.location.search);
const mascotaId = params.get("id");

// Validación ID
if (!mascotaId) {
    mostrarMensaje("Mascota no especificada", "danger");
    setTimeout(() => window.location.href = "mascotas.html", 800);
}

// ===================== CONTENEDOR =====================
const contenedor = document.getElementById("contenedorPostulantes");

// ===================== CARGAR =====================
async function cargarPostulantes() {

    try {

        contenedor.innerHTML = "<p>Cargando postulantes...</p>";

        const res = await fetch(`${API_URL}/solicitudes/mascota/${mascotaId}`, {
            headers: { Authorization: "Bearer " + token }
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message);

        const postulantes = data.data || [];

        contenedor.innerHTML = "";

        if (!postulantes.length) {
            contenedor.innerHTML = "<p>No hay postulantes aún 🐾</p>";
            return;
        }

        // ===================== RENDER =====================
        postulantes.forEach(p => {

            const persona = p.adoptante || {};

            const estadoColor =
                p.estado === "aprobado" ? "success" :
                p.estado === "rechazado" ? "danger" : "warning";

            const div = document.createElement("div");

            div.className = "card p-3 mb-3";

            div.innerHTML = `
                <h5>${persona.nombre || "Sin nombre"}</h5>

                ${
                    p.estado === "aprobado"
                    ? `
                        <p><strong>Email:</strong> ${persona.email}</p>
                        <p class="text-success fw-bold">🎉 Adoptante seleccionado</p>
                    `
                    : `
                        <p class="text-light">🔒 Email oculto</p>
                    `
                }

                <p>${p.mensaje || "Sin mensaje"}</p>

                <span class="badge bg-${estadoColor} mb-2">
                    ${p.estado}
                </span>

                <button 
                    class="btn btn-success w-100"
                    onclick="seleccionar(${p.id})"
                    ${p.estado === "aprobado" ? "disabled" : ""}
                >
                    Seleccionar adoptante
                </button>
            `;

            contenedor.appendChild(div);
        });

    } catch (error) {

        console.error(error);
        mostrarMensaje(error.message, "danger");
    }
}

// ===================== SELECCIONAR =====================
window.seleccionar = async function(id) {

    try {

        const res = await fetch(`${API_URL}/solicitudes/seleccionar/${id}`, {
            method:"PUT",
            headers:{ Authorization:"Bearer "+token }
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message);

        mostrarMensaje("Adopción completada 🎉", "success");

        setTimeout(cargarPostulantes, 800);

    } catch (error) {

        console.error(error);
        mostrarMensaje(error.message, "danger");
    }
}

// ===================== INIT =====================
document.addEventListener("DOMContentLoaded", cargarPostulantes);