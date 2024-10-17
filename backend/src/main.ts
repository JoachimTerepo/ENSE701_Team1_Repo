import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();  // Enable CORS if needed
  await app.init();  // Initialize the app, but don't call `listen()`
}

// Export the initialized app for Vercel
export const app = bootstrap();