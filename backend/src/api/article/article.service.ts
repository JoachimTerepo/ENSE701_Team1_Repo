import { Injectable } from '@nestjs/common';
import { Article } from './article.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ArticleDTO, ArticleFilter, ArticleUpdateDTO } from './dto';

// Service functions to help interact with the database
@Injectable()
export class ArticleService {

    constructor(@InjectModel(Article.name) private ArticleModel: Model<Article>) { }

    async findAll(filter: ArticleFilter): Promise<Article[]> {
        return await this.ArticleModel.find(filter).exec();
    }

    async findOne(id: string): Promise<Article> {
        return await this.ArticleModel.findById(id).exec();
    }

    async create(createArticleDto: ArticleDTO) {
        return await this.ArticleModel.create(createArticleDto);
    }

    async update(id: string, articleDto: ArticleDTO) {
        if (articleDto.claims !== undefined) {
            let data = { ...articleDto, claims: articleDto.claims.map(c => new Types.ObjectId(c)) }
            return await this.ArticleModel.findByIdAndUpdate(id, { $set: { claims: data.claims } }).exec();
        }
        return await this.ArticleModel.findByIdAndUpdate(id, articleDto).exec();
    }

    async delete(id: string) {
        const deletedUser = await this.ArticleModel.findByIdAndDelete(id).exec();
        return deletedUser;
    }
}
