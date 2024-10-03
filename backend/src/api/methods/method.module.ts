import { Module } from '@nestjs/common';
import { MethodController } from './method.controller';
import { MethodService } from './method.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Method, MethodSchema } from './method.schema';

// Add all the user components together to make the module
@Module({
    imports: [
        MongooseModule.forFeature([{ name: Method.name, schema: MethodSchema }]),
    ],
    controllers: [MethodController],
    providers: [MethodService],
})
export class ArticleModule { }