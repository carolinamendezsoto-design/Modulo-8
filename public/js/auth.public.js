// --------------------------------------------------
// TOKEN GLOBAL
// --------------------------------------------------

// Obtenemos el token guardado en localStorage o usamos string vacío si no existe
let token = localStorage.getItem("token") || "";


// --------------------------------------------------
// LOGIN
// --------------------------------------------------

// Función asíncrona para iniciar sesión
async function login() {

    // Obtenemos el valor del input de email desde el HTML
    const email = document.getElementById("loginEmail").value.trim();

    // Obtenemos el valor del input de contraseña desde el HTML
    const password = document.getElementById("loginPassword").value.trim();

    // --------------------------------------------------
    // VALIDACIÓN
    // --------------------------------------------------

    // Validamos que ambos campos estén completos
    if (!email || !password) {

        // Mostramos mensaje de error al usuario
        mostrarMensaje("Completa todos los campos", "danger");

        // Detenemos la ejecución
        return;
    }

    try {

        // --------------------------------------------------
        // PETICIÓN AL BACKEND
        // --------------------------------------------------

        // Enviamos petición POST al endpoint de login
        const res = await fetch("/api/auth/login", {

            // Indicamos método HTTP POST
            method: "POST",

            // Definimos headers
            headers: {

                // Indicamos que enviamos JSON
                "Content-Type": "application/json"
            },

            // Convertimos los datos a JSON
            body: JSON.stringify({ email, password })
        });

        // Convertimos la respuesta del backend a JSON
        const data = await res.json();

        // --------------------------------------------------
        // RESPUESTA
        // --------------------------------------------------

        // Validamos que la respuesta sea exitosa
        if (res.ok && data.status === "success") {

            // Guardamos el token en variable global
            token = data.data.token;

            // Guardamos el token en localStorage para futuras peticiones
            localStorage.setItem("token", token);

            // Guardamos los datos del usuario en localStorage
            localStorage.setItem("user", JSON.stringify(data.data.user));

            // Mostramos mensaje de éxito
            mostrarMensaje("Login exitoso 🔐");

            // --------------------------------------------------
            // REDIRECCIÓN SEGÚN ROL
            // --------------------------------------------------

            // Si el usuario es administrador
            if (data.data.user.rol === "admin") {

                // Redirigimos al panel admin
                window.location.href = "admin.html";

            } else {

                // Si no es admin, lo llevamos a mascotas
                window.location.href = "mascotas.html";
            }

        } else {

            // Si el login falla, mostramos error
            mostrarMensaje(data.message || "Credenciales incorrectas", "danger");
        }

    } catch (error) {

        // Mostramos error en consola (debug)
        console.error(error);

        // Mostramos error en pantalla
        mostrarMensaje("Error en login", "danger");
    }
}


// --------------------------------------------------
// CREAR USUARIO
// --------------------------------------------------

// Función para registrar un nuevo usuario
async function crearUsuario() {

    // Obtenemos nombre desde el input
    const nombre = document.getElementById("nombre").value.trim();

    // Obtenemos email desde el input
    const email = document.getElementById("email").value.trim();

    // Obtenemos teléfono (puede no existir, por eso usamos ?.)
    const telefono = document.getElementById("telefono")?.value.trim();

    // Obtenemos contraseña desde el input
    const password = document.getElementById("password").value.trim();

    // Obtenemos rol seleccionado
    const rol = document.getElementById("rol")?.value;

    // --------------------------------------------------
    // VALIDACIONES
    // --------------------------------------------------

    // Validamos que todos los campos estén completos
    if (!nombre || !email || !password || !telefono || !rol) {

        // Mostramos error
        mostrarMensaje("Completa todos los campos", "danger");

        return;
    }

    // Validamos formato básico de email
    if (!email.includes("@")) {

        // Mostramos error
        mostrarMensaje("Correo inválido", "danger");

        return;
    }

    // Validamos longitud mínima de contraseña
    if (password.length < 4) {

        // Mostramos error
        mostrarMensaje("La contraseña debe tener al menos 4 caracteres", "danger");

        return;
    }

    try {

        // --------------------------------------------------
        // PETICIÓN AL BACKEND
        // --------------------------------------------------

        // Enviamos petición POST para crear usuario
        const res = await fetch("/api/users", {

            // Método HTTP POST
            method: "POST",

            // Headers
            headers: {

                // Indicamos JSON
                "Content-Type": "application/json"
            },

            // Enviamos datos del usuario
            body: JSON.stringify({
                nombre,
                email,
                password,
                telefono,
                rol
            })
        });

        // Convertimos respuesta a JSON
        const data = await res.json();

        // Si la respuesta es exitosa
        if (res.ok) {

            // Mostramos mensaje de éxito
            mostrarMensaje(data.message || "Usuario creado correctamente");

            // Esperamos 1.5 segundos antes de redirigir
            setTimeout(() => {

                // Redirigimos al login
                window.location.href = "index.html";

            }, 1500);

        } else {

            // Mostramos error del backend
            mostrarMensaje(data.message || "Error al crear usuario", "danger");
        }

    } catch (error) {

        // Mostramos error en consola
        console.error(error);

        // Mostramos error visual
        mostrarMensaje("Error del servidor", "danger");
    }
}


// --------------------------------------------------
// LOGOUT
// --------------------------------------------------

// Función para cerrar sesión
function logout() {

    // Eliminamos el token del almacenamiento
    localStorage.removeItem("token");

    // Eliminamos datos del usuario
    localStorage.removeItem("user");

    // Redirigimos al login
    window.location.href = "index.html";
}