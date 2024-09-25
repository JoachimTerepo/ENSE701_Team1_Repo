import { Injectable } from '@nestjs/common';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './create-user-dto';

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
        return await this.UserModel.findById(id).exec();
    }

    async create(createUserDto: CreateUserDto) {
        return await this.UserModel.create(createUserDto);
    }

    async update(id: string, createUserDto: CreateUserDto) {
        return await this.UserModel.findByIdAndUpdate(id, createUserDto).exec();
    }

    async delete(id: string) {
        const deletedUser = await this.UserModel.findByIdAndDelete(id).exec();
        return deletedUser;
    }
}