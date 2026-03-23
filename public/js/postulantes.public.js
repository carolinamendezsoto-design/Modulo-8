// --------------------------------------------------
// TOKEN GLOBAL
// --------------------------------------------------

// Obtenemos token desde localStorage o usamos string vacío
let token = localStorage.getItem("token") || "";


// --------------------------------------------------
// LOGIN
// --------------------------------------------------

// Función async para iniciar sesión
async function login() {

    // Obtenemos valores desde inputs del HTML
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    // --------------------------------------------------
    // VALIDACIÓN
    // --------------------------------------------------

    // Validamos campos obligatorios
    if (!email || !password) {
        mostrarMensaje("Completa todos los campos", "danger");
        return; // detenemos ejecución
    }

    try {

        // --------------------------------------------------
        // PETICIÓN AL BACKEND
        // --------------------------------------------------

        const res = await fetch("/api/auth/login", {

            method: "POST", // enviamos datos

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({ email, password })
        });

        // Convertimos respuesta a JSON
        const data = await res.json();

        // --------------------------------------------------
        // RESPUESTA
        // --------------------------------------------------

        if (res.ok && data.status === "success") {

            // Guardamos token
            token = data.data.token;
            localStorage.setItem("token", token);

            // Guardamos usuario completo
            localStorage.setItem("user", JSON.stringify(data.data.user));

            mostrarMensaje("Login exitoso 🔐");

            // --------------------------------------------------
            // REDIRECCIÓN SEGÚN ROL
            // --------------------------------------------------

            if (data.data.user.rol === "admin") {
                window.location.href = "admin.html";
            } else {
                window.location.href = "mascotas.html";
            }

        } else {
            mostrarMensaje(data.message || "Credenciales incorrectas", "danger");
        }

    } catch (error) {

        // Error de red o backend caído
        console.error(error);

        mostrarMensaje("Error en login", "danger");
    }
}


// --------------------------------------------------
// CREAR USUARIO
// --------------------------------------------------

async function crearUsuario() {

    // Obtenemos valores del formulario
    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefono = document.getElementById("telefono")?.value.trim();
    const password = document.getElementById("password").value.trim();
    const rol = document.getElementById("rol")?.value;

    // --------------------------------------------------
    // VALIDACIONES
    // --------------------------------------------------

    if (!nombre || !email || !password || !telefono || !rol) {
        mostrarMensaje("Completa todos los campos", "danger");
        return;
    }

    if (!email.includes("@")) {
        mostrarMensaje("Correo inválido", "danger");
        return;
    }

    if (password.length < 4) {
        mostrarMensaje("La contraseña debe tener al menos 4 caracteres", "danger");
        return;
    }

    try {

        // Petición POST
        const res = await fetch("/api/users", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                nombre,
                email,
                password,
                telefono,
                rol
            })
        });

        const data = await res.json();

        if (res.ok) {

            mostrarMensaje(data.message || "Usuario creado correctamente");

            // Redirigimos después de un pequeño delay
            setTimeout(() => {
                window.location.href = "index.html";
            }, 1500);

        } else {

            mostrarMensaje(data.message || "Error al crear usuario", "danger");
        }

    } catch (error) {

        console.error(error);

        mostrarMensaje("Error del servidor", "danger");
    }
}


// --------------------------------------------------
// LOGOUT
// --------------------------------------------------

// Función para cerrar sesión
function logout() {

    // Eliminamos datos del usuario
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redirigimos al login
    window.location.href = "index.html";
}