import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

// Alias
export type UserDocument = HydratedDocument<User>

// The schema for MongoDB to use
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

// Create the schema
export const UserSchema = SchemaFactory.createForClass(User)

// A map of user roles
export enum ROLES {
    User = "User",
    Analyst = "Analyst",
    Moderator = "Moderator",
    Admin = "Admin"
}