import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "../user/user.schema";


export type NotificationDocument = HydratedDocument<Notification>

@Schema({ timestamps: true })
export class Notification {
    @Prop({ required: true })
    message: string
    // Who the notification is for
    @Prop({ required: true, type: { type: mongoose.Schema.Types.ObjectId, ref: "User" } })
    to: User[]
}

export const NotificationSchema = SchemaFactory.createForClass(Notification)