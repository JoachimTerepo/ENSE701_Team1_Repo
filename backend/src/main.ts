import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const frontendUrl = 'https://ense-701-team1-repo-git-backendchanges-joachimterepos-projects.vercel.app';

  // Enable CORS with specific frontend origin
  app.enableCors({
    origin: frontendUrl,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,  // Allow credentials like cookies, auth headers
    allowedHeaders: 'Content-Type, Authorization',  // Add other headers if needed
    preflightContinue: false,
    optionsSuccessStatus: 204
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
