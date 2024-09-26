
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './create-user-dto';

@Controller('/api/user')
export class UserController {
    @Get()
    findAll(): string {
        return 'This action returns all cats';
    }

    @Post('/create')
    async create(@Body() createUserDto: CreateUserDto) {
        try {
            await this.create(createUserDto)
            return "successful"
        } catch (e) {
            return "Something went wrong\n" + e
        }
    }
}
