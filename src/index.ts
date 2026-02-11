import { createApp } from '@presentation/app';
import { initializeDatabase, closeDatabase } from '@infrastructure/database';
import config from '@infrastructure/config/environment';

const app = createApp();

async function start() {
  try {
    // Inicializar banco de dados
    await initializeDatabase();
    console.log('✓ Database initialized');

    // Iniciar servidor
    app.listen(config.port, config.host, () => {
      console.log(
        `✓ Server running at http://${config.host}:${config.port}`
      );
      console.log(`✓ Environment: ${config.env}`);
    });
  } catch (error) {
    console.error('✗ Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully');
  await closeDatabase();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down gracefully');
  await closeDatabase();
  process.exit(0);
});

start();
