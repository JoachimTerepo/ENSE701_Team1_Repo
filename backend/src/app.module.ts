import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { UserModule } from './api/user/user.module';
import { ArticleModule } from './api/article/article.module';
import { ClaimModule } from './api/claim/claim.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    UserModule,
    ArticleModule,
    ClaimModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
