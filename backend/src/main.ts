import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express'; // default import

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  app.enableCors({ 
    origin: true, 
    credentials: true 
  });

  const port = process.env.PORT || 3000;
  await app.listen(port, () => console.log(`Server running on port ${port}`));
}

bootstrap();
