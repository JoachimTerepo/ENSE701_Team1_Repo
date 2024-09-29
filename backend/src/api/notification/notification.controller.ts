
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateNotificationDTO } from './create-notification-dto';
import { NotificationService } from './notification.service';

/**
 * API endpoint controller for `/api/notification`
 */
@Controller('/api/notification')
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) { }

    @Get()
    findAll(): string {
        return 'This action returns all cats';
    }

    // To create an article. Expects an object fitting the definition of the CreateArticleDto object
    @Post('/create')
    async create(@Body() createNotificationDto: CreateNotificationDTO) {
        try {
            // Try to create the user
            await this.notificationService.create(createNotificationDto)
            return "successful"
        } catch (e) {
            // Send the error back to the user
            // TODO: Improve this error message by making it an object
            return "Something went wrong\n" + e
        }
    }
}
