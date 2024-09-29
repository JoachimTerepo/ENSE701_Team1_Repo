import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true, })
    email: string
    @Prop({ required: true })
    password: string
    @Prop({ required: true })
    firstName: string
    @Prop({ required: true })
    lastName: string
    @Prop({ required: true })
    role: ROLES
}

export const UserSchema = SchemaFactory.createForClass(User)

export enum ROLES {
    User = "User",
    Analyst = "Analyst",
    Moderator = "Moderator",
    Admin = "Admin"
}