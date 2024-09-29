import mongoose from "mongoose"

export class CreateNotificationDTO {
    _id: string
    message: string
    to: mongoose.Schema.Types.ObjectId[]
}