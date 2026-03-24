const { Mascota } = require('./models');
async function test() {
    try {
        const pets = await Mascota.findAll();
        console.log(JSON.stringify(pets, null, 2));
        process.exit(0);
    } catch(e) {
        console.error(e);
        process.exit(1);
    }
}
test();
