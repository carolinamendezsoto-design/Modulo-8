// ------------------------------------------------------
// 🌐 CONFIG
// ------------------------------------------------------

// URL base del backend
const API_URL = "http://localhost:3000/api";


// ------------------------------------------------------
// 🔐 DATOS DE SESIÓN
// ------------------------------------------------------

// Obtenemos token
const token = localStorage.getItem("token");

// Obtenemos usuario
let user = null;

try {
    user = JSON.parse(localStorage.getItem("user")); // parse JSON
} catch {
    user = null; // fallback si falla
}


// ------------------------------------------------------
// 🚨 VALIDACIÓN
// ------------------------------------------------------

// Si no hay token → no renderizamos navbar
if (!token) {
    console.warn("Sin sesión activa"); // debug
}


// ------------------------------------------------------
// 🧩 FUNCIÓN PRINCIPAL NAVBAR
// ------------------------------------------------------

function initNavbar() {

    // Contenedor donde se insertará
    const contenedor = document.getElementById("navbar");

    // Si no existe → salimos
    if (!contenedor) return;

    // Nombre usuario
    const nombre = user?.nombre || "Usuario";

    // HTML navbar
    contenedor.innerHTML = `
        <nav class="d-flex justify-content-between align-items-center mb-4 p-3"
            style="background:rgba(255,255,255,0.1); border-radius:15px; backdrop-filter:blur(10px);">

            <div>
                <strong>🐾 Huellitas</strong>
            </div>

            <div class="d-flex align-items-center gap-3">

                <!-- Usuario -->
                <span>👤 ${nombre}</span>

                <!-- Botón logout -->
                <button class="btn btn-danger btn-sm" onclick="logout()">
                    Salir
                </button>

            </div>

        </nav>
    `;
}


// ------------------------------------------------------
// 🚀 AUTO INIT
// ------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
    initNavbar(); // inicializamos navbar
});