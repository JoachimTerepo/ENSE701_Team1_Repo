import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.init();  // Initialize the app, but don't bind to a port
}
export const app = bootstrap();  // Export the initialized app