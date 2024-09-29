
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateArticleDTO } from './create-article-dto';
import { ArticleService } from './article.service';

/**
 * API endpoint controller for `/api/article`
 */
@Controller('/api/article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) { }

    @Get()
    findAll(): string {
        return 'This action returns all cats';
    }

    // To create an article. Expects an object fitting the definition of the CreateArticleDto object
    @Post('/create')
    async create(@Body() createArticleDto: CreateArticleDTO) {
        try {
            // Try to create the user
            await this.articleService.create(createArticleDto)
            return "successful"
        } catch (e) {
            // Send the error back to the user
            // TODO: Improve this error message by making it an object
            return "Something went wrong\n" + e
        }
    }
}
