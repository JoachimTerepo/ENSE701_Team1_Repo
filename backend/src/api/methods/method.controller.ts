
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateMethodDTO } from './create-method-dto';
import { MethodService } from './method.service';

/**
 * API endpoint controller for `/api/Method`
 */
@Controller('/api/Method')
export class MethodController {
    constructor(private readonly MethodService: MethodService) { }

    @Get()
    findAll(): string {
        return 'This action returns all cats';
    }

    // To create an Method. Expects an object fitting the definition of the CreateMethodDto object
    @Post('/create')
    async create(@Body() createMethodDto: CreateMethodDTO) {
        try {
            // Try to create the user
            await this.MethodService.create(createMethodDto)
            return "successful"
        } catch (e) {
            // Send the error back to the user
            // TODO: Improve this error message by making it an object
            return "Something went wrong\n" + e
        }
    }
}
