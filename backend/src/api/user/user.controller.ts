
import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { CreateUserDto } from './create-user-dto';
import { UserService } from './user.service';
import { Response } from 'express';

/**
 * API endpoint controller for `/api/user`
 */
@Controller('/api/user/')
export class UserController {
    constructor(private readonly userService: UserService) { }

    // To create a user. Expects an object fitting the definition of the CreateUserDto object
    @Post('create')
    async create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto)
    }

    @Post('auth')
    async auth(
        @Body() dto: { email: string, password: string },
        @Res({ passthrough: true }) response: Response) {
        return this.userService.login(dto, response)
    }
}
