import connectionDB from '../database/conectionDB';

const run = async () => {
  try {
    console.log('Ejecutando migraciones (sync alter)...');
    await connectionDB.sync({ alter: true });
    console.log('Migraciones aplicadas (sync alter)');
    process.exit(0);
  } catch (err) {
    console.error('Error al ejecutar migraciones:', err);
    process.exit(1);
  }
};

run();
