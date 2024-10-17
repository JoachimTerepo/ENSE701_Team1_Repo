import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

// run backend command "npm run start"
// run frontend command "npm run dev"
async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  // Enable CORS
  app.enableCors({ 
    origin: true, 
    credentials: true 
  });

  const port = process.env.PORT || 3000;
  await app.listen(port, () => console.log(`Server running on port ${port}`));
}

bootstrap();