
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ArticleDTO, ArticleFilter } from './dto';
import { ArticleService } from './article.service';

/**
 * API endpoint controller for `/api/article`
 */
@Controller('/api/article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) { }

    @Post()
    async findAll(@Body() filter: ArticleFilter) {
        try {
            const data = await this.articleService.findAll(filter)
            return data
        } catch (e) {
            return { error: "Something went wrong\n" + e }
        }
    }

    // To create an article. Expects an object fitting the definition of the CreateArticleDto object
    @Post('/create')
    async create(@Body() createArticleDto: ArticleDTO) {
        try {
            // Try to create the user
            await this.articleService.create(createArticleDto)
            return { error: null }
        } catch (e) {
            // Send the error back to the user
            // TODO: Improve this error message by making it an object
            return { error: "Something went wrong\n" + e }
        }
    }

    @Post("/update")
    async update(@Body() articleDTO: ArticleDTO) {
        try {
            // Try to create the user
            await this.articleService.update(articleDTO.id, articleDTO)
            return { error: null }
        } catch (e) {
            // Send the error back to the user
            // TODO: Improve this error message by making it an object
            return { error: "Something went wrong\n" + e }
        }
    }
}
