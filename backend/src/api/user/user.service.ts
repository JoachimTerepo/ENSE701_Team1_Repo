import { Injectable } from '@nestjs/common';
import { ROLES, User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './create-user-dto';
import { Response } from 'express';
import * as bcrypt from 'bcrypt'

// Service functions to help interact with the database
@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private UserModel: Model<User>) { }

    test(): string {
        return 'User route testing';
    }

    async findAll(): Promise<User[]> {
        return await this.UserModel.find().exec();
    }

    async findOne(id: string): Promise<User> {
        const objId = new Types.ObjectId(id)
        return await this.UserModel.findById(objId, { password: 0 }).exec();
    }

    async findByEmail(email: string): Promise<User> {
        return await this.UserModel.findOne({ email }, { password: 0 }).exec()
    }

    async findByEmailWithPassword(email: string): Promise<User> {
        return await this.UserModel.findOne({ email }).exec()
    }

    async login(dto: { email: string, password: string }, response: Response) {
        try {
            const user = await this.findByEmailWithPassword(dto.email)
            if (user === null) {
                response.statusCode = 400
                return { error: "User not found" }
            }

            const match = await bcrypt.compare(dto.password, user.password)
            if (!match) {
                response.statusCode = 400
                return { error: "Email or password was incorrect" }
            }
            return { data: user._id }
        } catch (e) {
            response.statusCode = 500
            return { error: "Server error: " + e }
        }

    }

    async create(createUserDto: CreateUserDto) {
        try {
            const user = await this.findByEmail(createUserDto.email)
            if (user !== null) {
                return { error: "User already exists" }
            }
            createUserDto.password = await bcrypt.hash(createUserDto.password, 10)
            createUserDto.role = ROLES.User
            // Try to create the user
            const res = await this.UserModel.create(createUserDto);
            console.log(res)
        } catch (e) {
            return { error: "Something went wrongs " + e }
        }
    }

    async update(id: string, createUserDto: CreateUserDto) {
        return await this.UserModel.findByIdAndUpdate(id, createUserDto).exec();
    }

    async delete(id: string) {
        const deletedUser = await this.UserModel.findByIdAndDelete(id).exec();
        return deletedUser;
    }
}