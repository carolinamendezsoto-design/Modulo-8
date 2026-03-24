// ------------------------------------------------------
// 🌐 CONFIG BASE URL (IMPORTANTE)
// ------------------------------------------------------

// Definimos la URL base del backend (evita hardcodear en cada fetch)
const API_URL = "http://localhost:3000/api";

// ------------------------------------------------------
// 🔐 FUNCIÓN LOGIN
// ------------------------------------------------------

async function login(email, password) {

    try {

        // Validación email
        if (!email) {
            mostrarMensaje("Debes ingresar un email", "warning"); // mensaje UX
            return; // detenemos ejecución
        }

        // Validación password
        if (!password) {
            mostrarMensaje("Debes ingresar una contraseña", "warning");
            return;
        }

        // Petición al backend
        const response = await fetch(`${API_URL}/auth/login`, { // usamos base URL
            method: "POST", // método HTTP
            headers: {
                "Content-Type": "application/json" // enviamos JSON
            },
            body: JSON.stringify({ email, password }) // convertimos datos
        });

        // Convertimos respuesta
        const data = await response.json();

        console.log("RESPUESTA LOGIN:", data); // debug

        // Validamos respuesta backend
        if (!response.ok) {
            throw new Error(data.message || "Error al iniciar sesión");
        }

        // Extraemos datos
        const token = data.data?.token; // token JWT
        const user = data.data?.user; // usuario

        // Validaciones críticas
        if (!token) throw new Error("No se recibió token");
        if (!user) throw new Error("No se recibió usuario");

        // Guardamos en localStorage
        localStorage.setItem("token", token); // guardamos token
        localStorage.setItem("user", JSON.stringify(user)); // guardamos user

        // Normalizamos rol
        const rol = user?.rol?.toLowerCase()?.trim();

        // Redirección según rol
        if (rol === "admin") return window.location.href = "admin.html";
        if (rol === "rescatista") return window.location.href = "rescatista.html";
        if (rol === "adoptante") return window.location.href = "mascotas.html";

        // fallback
        window.location.href = "index.html";

    } catch (error) {

        console.error("ERROR LOGIN:", error); // debug

        mostrarMensaje(error.message, "danger"); // mensaje usuario
    }
}


// ------------------------------------------------------
// 👤 FUNCIÓN REGISTRO
// ------------------------------------------------------

async function crearUsuario(userData) {

    try {

        console.log("CREANDO USUARIO:", userData); // debug

        // Request backend
        const response = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        // Convertimos respuesta
        const data = await response.json();

        console.log("RESPUESTA REGISTER:", data);

        // Validamos respuesta
        if (!response.ok) {
            throw new Error(data.message || "Error al registrar usuario");
        }

        // Mensaje éxito
        mostrarMensaje("Cuenta creada correctamente 🎉", "success");

        // Redirección
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1500);

    } catch (error) {

        console.error("ERROR REGISTER:", error);

        mostrarMensaje(error.message, "danger");
    }
}


// ------------------------------------------------------
// 🚪 FUNCIÓN LOGOUT
// ------------------------------------------------------

function logout() {

    // Eliminamos TODO lo relacionado a sesión
    localStorage.removeItem("token"); // token
    localStorage.removeItem("user"); // usuario

    // Limpieza extra (por si agregas cosas después)
    localStorage.clear(); // limpia todo (opcional pero pro)

    console.log("Sesión cerrada"); // debug

    // Redirección al login
    window.location.href = "index.html";
}


// ------------------------------------------------------
// 🔐 HELPER TOKEN (PRO)
// ------------------------------------------------------

function getToken() {
    return localStorage.getItem("token"); // retorna token
}


// ------------------------------------------------------
// 🌍 EXPONER FUNCIONES GLOBALMENTE
// ------------------------------------------------------

// Esto permite usarlas en HTML (onclick, etc.)
window.login = login;
window.logout = logout;
window.crearUsuario = crearUsuario;
window.getToken = getToken;