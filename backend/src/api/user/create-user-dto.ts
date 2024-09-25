import { Date } from "mongoose";
import { ROLES } from "./user.schema";


export class CreateUserDto {
    id: string;
    created_at: Date;
    updated_at: Date;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: ROLES;
}