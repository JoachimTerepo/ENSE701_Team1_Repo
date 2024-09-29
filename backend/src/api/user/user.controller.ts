
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './create-user-dto';
import { UserService } from './user.service';

@Controller('/api/user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    findAll(): string {
        return 'This action returns all cats';
    }

    @Post('/create')
    async createUser(@Body() createUserDto: CreateUserDto) {
        try {
            await this.userService.create(createUserDto)
            return "successful"
        } catch (e) {
            return "Something went wrong\n" + e
        }
    }
}
