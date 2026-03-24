const { User, Mascota } = require('./models');

async function seed() {
    try {
        let user = await User.findOne({ where: { rol: 'rescatista' }});
        
        await Mascota.create({
            nombre: 'Mirana',
            raza: 'Siberiana Mestiza',
            edad: '8 meses',
            porte: 'pequeño',
            energia: 'media',
            descripcion: 'Mirana es una perrita rescatada sumamente cariñosa. Tiene todas sus vacunas al día y busca una familia paciente que le dé mucho amor. ¡Ojos preciosos!',
            imagen: '1774304617904-Mirana.webp',
            estado: 'disponible',
            userId: user ? user.id : 1
        });
        console.log('EXITO_SEED');
        process.exit(0);
    } catch (e) {
        console.error('ERROR_SEED:', e);
        process.exit(1);
    }
}
seed();
