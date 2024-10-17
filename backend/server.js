// backend/server.js

const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('./src/app.module');

async function createApp() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  return app.init();  // Don't bind to any port
}

module.exports = createApp;
