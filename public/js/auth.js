// --------------------------------------------------
// TOKEN GLOBAL
// --------------------------------------------------

// Intentamos obtener el token guardado en localStorage
// Si no existe, usamos string vacío
let token = localStorage.getItem("token") || "";


// --------------------------------------------------
// LOGIN
// --------------------------------------------------

async function login() {

    // Obtenemos valores desde los inputs del HTML
    const email = document.getElementById("loginEmail").value.trim(); // quitamos espacios
    const password = document.getElementById("loginPassword").value.trim();

    // --------------------------------------------------
    // VALIDACIÓN
    // --------------------------------------------------

    // Verificamos que ambos campos estén completos
    if (!email || !password) {

        // Mostramos mensaje de error
        mostrarMensaje("Completa todos los campos", "danger");

        return; // detenemos ejecución
    }

    try {

        // --------------------------------------------------
        // PETICIÓN AL BACKEND
        // --------------------------------------------------

        const res = await fetch("/api/auth/login", {

            method: "POST", // método POST para enviar datos

            headers: {
                "Content-Type": "application/json" // indicamos formato JSON
            },

            // Enviamos email y password en formato JSON
            body: JSON.stringify({ email, password })
        });

        // Convertimos la respuesta a JSON
        const data = await res.json();

        // --------------------------------------------------
        // RESPUESTA
        // --------------------------------------------------

        // Validamos que la respuesta sea exitosa
        if (res.ok && data.status === "success") {

            // Guardamos token recibido
            token = data.data.token;

            // Guardamos token en localStorage
            localStorage.setItem("token", token);

            // Guardamos usuario completo (incluye rol)
            localStorage.setItem("user", JSON.stringify(data.data.user));

            // Mensaje de éxito
            mostrarMensaje("Login exitoso 🔐");

            // --------------------------------------------------
            // REDIRECCIÓN SEGÚN ROL
            // --------------------------------------------------

            // Si el usuario es admin
            if (data.data.user.rol === "admin") {

                // Redirige al panel admin
                window.location.href = "admin.html";

            } else {

                // Usuario normal (adoptante o rescatista)
                window.location.href = "mascotas.html";
            }

        } else {

            // Mostramos error enviado por backend
            mostrarMensaje(data.message || "Credenciales incorrectas", "danger");
        }

    } catch (error) {

        // Error de red o servidor
        console.error(error);

        mostrarMensaje("Error en login", "danger");
    }
}


// --------------------------------------------------
// CREAR USUARIO (REGISTRO)
// --------------------------------------------------

async function crearUsuario() {

    // Obtenemos valores del formulario
    const nombre = document.getElementById("nombre").value.trim(); // quitamos espacios
    const email = document.getElementById("email").value.trim();
    const telefono = document.getElementById("telefono")?.value.trim(); // evitamos error si no existe
    const password = document.getElementById("password").value.trim();
    const rol = document.getElementById("rol")?.value; // evitamos error si no existe

    // --------------------------------------------------
    // VALIDACIÓN
    // --------------------------------------------------

    // Validamos campos obligatorios (ahora sí completo)
    if (!nombre || !email || !password || !telefono || !rol) {

        mostrarMensaje("Completa todos los campos", "danger");

        return;
    }

    // Validación básica de email (bonus profe)
    if (!email.includes("@")) {
        mostrarMensaje("Correo inválido", "danger");
        return;
    }

    // Validación básica de password
    if (password.length < 4) {
        mostrarMensaje("La contraseña debe tener al menos 4 caracteres", "danger");
        return;
    }

    try {

        // --------------------------------------------------
        // PETICIÓN AL BACKEND
        // --------------------------------------------------

        const res = await fetch("/api/users", {

            method: "POST", // método POST

            headers: {
                "Content-Type": "application/json" // enviamos JSON
            },

            // Enviamos todos los datos necesarios
            body: JSON.stringify({
                nombre,
                email,
                password,
                telefono,
                rol
            })
        });

        // Convertimos respuesta
        const data = await res.json();

        // --------------------------------------------------
        // RESPUESTA
        // --------------------------------------------------

        // Si todo salió bien
        if (res.ok) {

            // Mostramos mensaje éxito
            mostrarMensaje(data.message || "Usuario creado correctamente");

            // Redirigimos al login después de 1.5 segundos
            setTimeout(() => {
                window.location.href = "index.html";
            }, 1500);

        } else {

            // Error backend
            mostrarMensaje(data.message || "Error al crear usuario", "danger");
        }

    } catch (error) {

        // Error de servidor
        console.error(error);

        mostrarMensaje("Error del servidor", "danger");
    }
}


// --------------------------------------------------
// LOGOUT
// --------------------------------------------------

function logout() {

    // Eliminamos token del localStorage
    localStorage.removeItem("token");

    // Eliminamos usuario (incluye rol)
    localStorage.removeItem("user");

    // Redirigimos al login
    window.location.href = "index.html";
}