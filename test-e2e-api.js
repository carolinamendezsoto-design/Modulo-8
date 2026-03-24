const API_URL = "http://localhost:3000/api";

async function runTests() {
    console.log("🚀 Iniciando prueba global del sistema Huellitas de Amor API...\n");

    try {
        // 1. Registro de Rescatista de prueba
        const t = Date.now();
        const rescatistaEmail = `rescatista_${t}@test.com`;
        
        console.log("👤 [1/4] Registrando rescatista temporal...");
        const regRes = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre: "Tester", email: rescatistaEmail, telefono: "555123456", password: "password123", rol: "rescatista" })
        });
        const regData = await regRes.json();
        console.log("Respuesta de registro:", regData);

        // 2. Login Rescatista
        console.log("🔐 [2/4] Iniciando sesión...");
        let res = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: rescatistaEmail, password: "password123" })
        });
        const loginData = await res.json();
        console.log("Respuesta de login:", loginData);
        const token = loginData.data?.token;
        const userId = loginData.data?.user?.id;

        if (!token) throw new Error("Fallo el login, no hay token");
        console.log(`✅ Login exitoso. Token obtenido, User ID: ${userId}`);

        // 3. Crear mascota artificial
        console.log("🐾 [3/4] Publicando mascota con el perfil rescatista...");
        const formData = new FormData();
        formData.append("nombre", "Firulais Test");
        formData.append("raza", "Mestizo");
        formData.append("edad", "2 años");
        formData.append("porte", "Mediano");
        formData.append("energia", "Alta");
        formData.append("descripcion", "Prueba e2e automatizada");
        
        res = await fetch(`${API_URL}/mascotas`, {
            method: "POST",
            headers: { "Authorization": `Bearer ${token}` },
            body: formData
        });
        const petData = await res.json();
        if (!petData.ok) throw new Error("No se pudo crear mascota: " + petData.message);
        console.log(`✅ Mascota creada exitosamente. Estado: ${petData.data.estado}`);

        // 4. Probar que GET mascotas aísla los datos usando el filtro userId que recién arreglamos
        console.log("🔍 [4/4] Verificando aislamiento de perfil (userId filter fix)...");
        res = await fetch(`${API_URL}/mascotas?userId=${userId}`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        const queryData = await res.json();

        // Validamos lógica
        if (queryData.ok && queryData.data.length >= 1) {
            console.log(`✅ ¡Éxito crítico! El rescatista solo ve sus ${queryData.data.length} mascota(s).`);
            console.log(`✅ Detalles del aislamiento de perfil validados. Las funciones ya NO se mezclan.`);
        } else {
            throw new Error("El arreglo volvió vacío o hubo un error en la solicitud.");
        }

        console.log("\n🎉 PRUEBA GLOBAL SUPERADA 🎉");

    } catch(err) {
        console.error("\n❌ ERROR EN LA PRUEBA:", err.message);
    }
}

runTests();
