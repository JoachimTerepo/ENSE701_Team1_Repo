import { Injectable } from '@nestjs/common';
import { Article } from './article.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateArticleDTO } from './create-article-dto';

// Service functions to help interact with the database
@Injectable()
export class ArticleService {

    constructor(@InjectModel(Article.name) private UserModel: Model<Article>) { }

    test(): string {
        return 'User route testing';
    }

    async findAll(): Promise<Article[]> {
        return await this.UserModel.find().exec();
    }

    async findOne(id: string): Promise<Article> {
        return await this.UserModel.findById(id).exec();
    }

    async create(createArticleDto: CreateArticleDTO) {
        return await this.UserModel.create(createArticleDto);
    }

    async update(id: string, createArticleDto: CreateArticleDTO) {
        return await this.UserModel.findByIdAndUpdate(id, createArticleDto).exec();
    }

    async delete(id: string) {
        const deletedUser = await this.UserModel.findByIdAndDelete(id).exec();
        return deletedUser;
    }
}