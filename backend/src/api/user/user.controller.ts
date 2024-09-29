
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './create-user-dto';
import { UserService } from './user.service';

/**
 * API endpoint controller for `/api/user`
 */
@Controller('/api/user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    async findAll() {
        return await this.userService.findAll()
    }

    // To create a user. Expects an object fitting the definition of the CreateUserDto object
    @Post('/create')
    async create(@Body() createUserDto: CreateUserDto) {
        try {
            // Try to create the user
            await this.userService.create(createUserDto)
            return "successful"
        } catch (e) {
            // Send the error back to the user
            // TODO: Improve this error message by making it an object
            return "Something went wrong\n" + e
        }
    }
}
