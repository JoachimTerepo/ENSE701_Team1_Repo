import { Injectable } from '@nestjs/common';
import { Notification } from './notification.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateNotificationDTO } from './create-notification-dto';

// Service functions to help interact with the database
@Injectable()
export class NotificationService {

    constructor(@InjectModel(Notification.name) private UserModel: Model<Notification>) { }

    test(): string {
        return 'User route testing';
    }

    async findAll(): Promise<Notification[]> {
        return await this.UserModel.find().exec();
    }

    async findOne(id: string): Promise<Notification> {
        return await this.UserModel.findById(id).exec();
    }

    async create(createUserDto: CreateNotificationDTO) {
        return await this.UserModel.create(createUserDto);
    }

    async update(id: string, createUserDto: CreateNotificationDTO) {
        return await this.UserModel.findByIdAndUpdate(id, createUserDto).exec();
    }

    async delete(id: string) {
        const deletedUser = await this.UserModel.findByIdAndDelete(id).exec();
        return deletedUser;
    }
}