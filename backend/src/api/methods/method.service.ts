import { Injectable } from '@nestjs/common';
import { Method } from './method.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMethodDTO } from './create-method-dto';

// Service functions to help interact with the database
@Injectable()
export class MethodService {

    constructor(@InjectModel(Method.name) private UserModel: Model<Method>) { }

    test(): string {
        return 'Method route testing';
    }

    async findAll(): Promise<Method[]> {
        return await this.UserModel.find().exec();
    }

    async findOne(id: string): Promise<Method> {
        return await this.UserModel.findById(id).exec();
    }

    async create(createUserDto: CreateMethodDTO) {
        return await this.UserModel.create(createUserDto);
    }

    async update(id: string, createUserDto: CreateMethodDTO) {
        return await this.UserModel.findByIdAndUpdate(id, createUserDto).exec();
    }

    async delete(id: string) {
        const deletedUser = await this.UserModel.findByIdAndDelete(id).exec();
        return deletedUser;
    }
}