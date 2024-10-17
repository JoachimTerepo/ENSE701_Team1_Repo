import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'https://ense-701-team1-repo-git-backendchanges-joachimterepos-projects.vercel.app', // Frontend URL
    credentials: true, // If you need to allow credentials (cookies, auth headers)
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
