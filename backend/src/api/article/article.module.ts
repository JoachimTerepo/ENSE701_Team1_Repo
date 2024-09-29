import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Article, ArticleSchema } from './article.schema';

// Add all the user components together to make the module
@Module({
    imports: [
        MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
    ],
    controllers: [ArticleController],
    providers: [ArticleService],
})
export class ArticleModule { }