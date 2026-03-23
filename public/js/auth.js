// ------------------------------------------------------
// FUNCIÓN LOGIN
// ------------------------------------------------------

async function login(email, password) {

    try {

        // Validar email
        if (!email) {
            mostrarMensaje("Debes ingresar un email", "warning");
            return;
        }

        // Validar password
        if (!password) {
            mostrarMensaje("Debes ingresar una contraseña", "warning");
            return;
        }

        // Request al backend
        const response = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        // Convertir respuesta
        const data = await response.json();

        console.log("RESPUESTA LOGIN:", data);

        // Manejo error backend
        if (!response.ok) {
            throw new Error(data.message || "Error al iniciar sesión");
        }

        // Extraer datos
        const token = data.data?.token;
        const user = data.data?.user;

        if (!token) throw new Error("No se recibió token");
        if (!user) throw new Error("No se recibió usuario");

        // Guardar sesión
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        // Normalizar rol
        const rol = user?.rol?.toLowerCase()?.trim();

        // Redirección
        if (rol === "admin") return window.location.href = "admin.html";
        if (rol === "rescatista") return window.location.href = "rescatista.html";
        if (rol === "adoptante") return window.location.href = "mascotas.html";

        window.location.href = "index.html";

    } catch (error) {

        console.error("ERROR LOGIN:", error);
        mostrarMensaje(error.message, "danger");
    }
}


// ------------------------------------------------------
// 🚀 FUNCIÓN CREAR USUARIO (FIX CRÍTICO)
// ------------------------------------------------------

async function crearUsuario(userData) {

    try {

        console.log("CREANDO USUARIO:", userData);

        // Request al backend
        const response = await fetch("http://localhost:3000/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        // Convertir respuesta
        const data = await response.json();

        console.log("RESPUESTA REGISTER:", data);

        // Validar respuesta
        if (!response.ok) {
            throw new Error(data.message || "Error al registrar usuario");
        }

        // Mensaje éxito
        mostrarMensaje("Cuenta creada correctamente 🎉", "success");

        // Redirigir a login después de 1.5s
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1500);

    } catch (error) {

        console.error("ERROR REGISTER:", error);

        mostrarMensaje(error.message, "danger");
    }
}


// ------------------------------------------------------
// FUNCIÓN LOGOUT
// ------------------------------------------------------

function logout() {

    localStorage.removeItem("token"); // eliminar token
    localStorage.removeItem("user");  // eliminar usuario

    console.log("Sesión cerrada");

    window.location.href = "index.html";
}


// ------------------------------------------------------
// 🔥 FIX GLOBAL (CLAVE PARA HTML)
// ------------------------------------------------------

// Hacemos accesibles las funciones al HTML
window.login = login;
window.logout = logout;
window.crearUsuario = crearUsuario;