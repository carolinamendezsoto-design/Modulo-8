// --------------------------------------------------
// OBTENER TOKEN DESDE LOCALSTORAGE
// --------------------------------------------------

// Intentamos obtener el token guardado (si existe)
let token = localStorage.getItem("token") || "";


// --------------------------------------------------
// LOGIN
// --------------------------------------------------

async function login() {

    // Obtenemos valores desde los inputs
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    // Validamos que no estén vacíos
    if (!email || !password) {

        mostrarMensaje("Completa todos los campos", "danger");
        return; // detenemos ejecución
    }

    try {

        // Petición al backend
        const res = await fetch("/auth/login", {

            method: "POST", // tipo de petición

            headers: {
                "Content-Type": "application/json"
            },

            // Enviamos datos como JSON
            body: JSON.stringify({ email, password })

        });

        // Convertimos respuesta a JSON
        const data = await res.json();

        // Si login exitoso
        if (data.status === "success") {

            // Guardamos token
            token = data.data.token;

            // Lo guardamos en localStorage
            localStorage.setItem("token", token);

            // Mensaje
            mostrarMensaje("Login exitoso 🔐");

            // Redirigimos a usuarios
            window.location.href = "usuarios.html";

        } else {

            // Error del backend
            mostrarMensaje(data.message, "danger");
        }

    } catch (error) {

        console.error(error);
        mostrarMensaje("Error en login", "danger");
    }
}


// --------------------------------------------------
// CREAR USUARIO (REGISTRO)
// --------------------------------------------------

async function crearUsuario() {

    // Obtenemos valores de los inputs
    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Validación básica
    if (!nombre || !email || !password) {

        mostrarMensaje("Todos los campos son obligatorios", "danger");
        return;
    }

    try {

        // Petición POST al backend
        const res = await fetch("/api/users", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({ nombre, email, password })

        });

        const data = await res.json();

        // Mostramos mensaje
        mostrarMensaje(data.message);

    } catch (error) {

        console.error(error);
        mostrarMensaje("Error al crear usuario", "danger");
    }
}


// --------------------------------------------------
// LOGOUT
// --------------------------------------------------

function logout() {

    // Eliminamos token
    localStorage.removeItem("token");

    // Redirigimos al login
    window.location.href = "index.html";
}